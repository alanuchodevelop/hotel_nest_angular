import { Controller, Get, Post, Param, Delete, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '../entities/users.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

@ApiTags('users') // Etiqueta para Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener todos los usuarios
  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  // Obtener un usuario por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Users> {
    return this.usersService.findOne(id);
  }

  // Crear un nuevo usuario
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }

  // Editar un usuario existente
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.update(id, updateUserDto);
  }

  // Eliminar un usuario
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
