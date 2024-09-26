import { Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Rooms } from '../entities/rooms.entity';
import { ApiTags } from '@nestjs/swagger';

// controlador para rooms
@ApiTags('rooms') // Etiqueta para Swagger
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}
  @Get()
  findAll(): Promise<Rooms[]> {
    return this.roomService.findAll();
  }
}
