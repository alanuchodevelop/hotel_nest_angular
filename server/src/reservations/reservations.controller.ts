import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './create-reservation.dto';
import { UpdateReservationDto } from './update-reservation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reservaciones') // Etiqueta para Swagger
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
    update(@Param('id') id: number,
    @Body() updateReservationDto: UpdateReservationDto,  // Asegúrate de que el DTO es correcto
    ) {
    return this.reservationsService.update(id, updateReservationDto);
    }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reservationsService.remove(id);
  }
}
