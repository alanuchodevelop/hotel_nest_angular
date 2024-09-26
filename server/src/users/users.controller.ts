import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '../entities/users.entity';
import { ApiTags } from '@nestjs/swagger';

// controlador de usuarios
@ApiTags('users') // Etiqueta para Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }
}
