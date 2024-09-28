import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';  // Importa los operadores
import { Reservations } from '../entities/reservations.entity';
import { CreateReservationDto } from './create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservations)
    private reservationsRepository: Repository<Reservations>,
  ) {}

  async findAll(): Promise<Reservations[]> {
    return this.reservationsRepository.find();
  }

  async findOne(id: number): Promise<Reservations> {
    return this.reservationsRepository.findOne({
      where: { id }
    });
  }


  async update(id: number, updateReservationDto: CreateReservationDto): Promise<Reservations> {
    const reservation = await this.reservationsRepository.preload({
      id: id,
      ...updateReservationDto,
    });
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    return this.reservationsRepository.save(reservation);
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
  async create(createReservationDto: CreateReservationDto): Promise<Reservations> {
    console.log('Service - Start Date:', createReservationDto.startDate);
    console.log('Service - End Date:', createReservationDto.endDate);

    const reservation = new Reservations();
    reservation.start_date = new Date(createReservationDto.startDate);  // Convertir a Date
    reservation.end_date = new Date(createReservationDto.endDate);
    reservation.status = createReservationDto.status;

    return await this.reservationsRepository.save(reservation);
  }
}
