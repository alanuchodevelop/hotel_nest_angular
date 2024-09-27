import { Controller, Get, Param, Delete, Post, Put, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Rooms } from '../entities/rooms.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto'; // DTO para creación
import { UpdateRoomDto } from './update-room.dto'; // DTO para actualización


@ApiTags('rooms') // Etiqueta para Swagger
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  // Obtener todas las habitaciones
  @Get()
  findAll(): Promise<Rooms[]> {
    return this.roomService.findAll();
  }

  // Crear una nueva habitación
  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Rooms> {
    return this.roomService.create(createRoomDto);
  }

  // Actualizar una habitación por ID
  @Put(':id')
  update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto): Promise<Rooms> {
    return this.roomService.update(id, updateRoomDto);
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
