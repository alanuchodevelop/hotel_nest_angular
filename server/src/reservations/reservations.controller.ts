import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './create-reservation.dto';
import { UpdateReservationDto } from './update-reservation.dto';
import { Reservations } from '../entities/reservations.entity';  // Asegúrate de que la ruta sea correcta
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';  // Servicio de usuarios
import { RoomsService } from '../rooms/rooms.service';  // Servicio de habitaciones

@ApiTags('reservaciones') // Etiqueta para Swagger
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly usersService: UsersService,  // Inyectar el servicio de usuarios
    private readonly roomsService: RoomsService,  // Inyectar el servicio de habitaciones
  ) {}

  @Post()
  @Post()
async create(@Body() createReservationDto: CreateReservationDto) {
  // Crear una instancia de la entidad Reservations
  const reservation = new Reservations();  // Aquí es 'reservation' en singular

  // Buscar la entidad de usuario usando el userId y asignarla a la reservación
  const user = await this.usersService.findOne(createReservationDto.userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  reservation.user = user;  // Asignar el usuario encontrado

  // Buscar la entidad de habitación usando el roomId y asignarla a la reservación
  const room = await this.roomsService.findOne(createReservationDto.roomId);
  if (!room) {
    throw new Error('Habitación no encontrada');
  }
  reservation.room = room;  // Asignar la habitación encontrada

  // Asignar las fechas y el estado
  reservation.start_date = createReservationDto.startDate;
  reservation.end_date = createReservationDto.endDate;
  reservation.status = createReservationDto.status || 'Pendiente';

  // Llamar al servicio para crear la reservación
  return this.reservationsService.create(reservation);  // Cambia 'reservations' a 'reservation'
}


  @Get()
  async findAll() {
    const reservations = await this.reservationsService.findAll();
    return reservations.map(reservation => ({
      id: reservation.id,
      start_date: reservation.start_date,
      end_date: reservation.end_date,
      status: reservation.status,
      roomId: reservation.room.id,  // Extraer solo el ID de la habitación
      userId: reservation.user.id,  // Extraer solo el ID del usuario
      created_at: reservation.created_at,
      updated_at: reservation.updated_at,
    }));
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reservationsService.remove(id);
  }
}
