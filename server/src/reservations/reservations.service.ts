import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';  // Importa los operadores
import { Reservations } from '../entities/reservations.entity';
import { CreateReservationDto } from './create-reservation.dto';
import { Users } from '../entities/users.entity';
import { Rooms } from '../entities/rooms.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservations)
    private reservationsRepository: Repository<Reservations>,
    @InjectRepository(Users)  // Inyectar el repositorio de usuarios
    private userRepository: Repository<Users>,

    @InjectRepository(Rooms)  // Inyectar el repositorio de habitaciones
    private roomRepository: Repository<Rooms>,
  ) {}

  async findAll(): Promise<Reservations[]> {
    return this.reservationsRepository
      .createQueryBuilder('reservations')
      .leftJoinAndSelect('reservations.user', 'user')
      .leftJoinAndSelect('reservations.room', 'room')
      .select([
        'reservations.id',
        'reservations.start_date',
        'reservations.end_date',
        'reservations.status',
        'reservations.created_at',
        'reservations.updated_at',
        'user.id',  // Solo seleccionamos el ID del usuario
        'room.id',  // Solo seleccionamos el ID de la habitación
      ])
      .getMany();
  }

  async findOne(id: number): Promise<Reservations> {
    return this.reservationsRepository.findOne({
      where: { id }
    });
  }


  async update(id: number, updateReservationDto: CreateReservationDto): Promise<Reservations> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },  // Buscar por ID
      relations: ['user', 'room']  // Cargar relaciones si es necesario
    });

    if (!reservation) {
        throw new Error('Reservation not found');
    }

    // Usar `findOneBy` para buscar por `userId` y `roomId`
    reservation.user = await this.userRepository.findOneBy({ id: updateReservationDto.userId });
    reservation.room = await this.roomRepository.findOneBy({ id: updateReservationDto.roomId });
    reservation.start_date = new Date(updateReservationDto.startDate + 'T00:00:00Z');
    reservation.end_date = new Date(updateReservationDto.endDate + 'T00:00:00Z');

    const updatedReservation = await this.reservationsRepository.save(reservation);

    return updatedReservation;  // Aquí retornamos la reserva actualizada
}


  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);
    this.reservationsRepository.remove(reservation);
  }


  // Verificar disponibilidad
  async checkAvailability(startDate: Date, endDate: Date): Promise<boolean> {
    const existingReservations = await this.reservationsRepository.find({
      where: [
        {
          start_date: LessThanOrEqual(endDate),
          end_date: MoreThanOrEqual(startDate),
        },
      ],
    });

    return existingReservations.length === 0;
  }

  // Crear nueva reserva
   // Cambia el tipo de CreateReservationDto a Reservations
   create(reservation: Reservations): Promise<Reservations> {
    return this.reservationsRepository.save(reservation);
  }
}
