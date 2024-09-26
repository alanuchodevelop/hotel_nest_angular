import { Controller, Get, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Rooms } from '../entities/rooms.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rooms') // Etiqueta para Swagger
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  // Obtener todas las habitaciones
  @Get()
  findAll(): Promise<Rooms[]> {
    return this.roomService.findAll();
  }

  // Obtener una habitación por ID
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Rooms> {
    return this.roomService.findOne(id);
  }

  // Eliminar una habitación por ID
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.roomService.remove(id);
  }
}
