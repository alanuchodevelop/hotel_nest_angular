import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from '../entities/rooms.entity';
import { CreateRoomDto } from './create-room.dto'; // DTO para creación
import { UpdateRoomDto } from './update-room.dto'; // DTO para actualización


@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
  ) {}

  // Obtener todas las habitaciones
  findAll(): Promise<Rooms[]> {
    return this.roomsRepository.find();
  }

  // Crear una nueva habitación
  async create(createRoomDto: CreateRoomDto): Promise<Rooms> {
    const newRoom = this.roomsRepository.create(createRoomDto);
    return this.roomsRepository.save(newRoom);
  }

  // Actualizar una habitación por ID
  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Rooms> {
    const room = await this.findOne(id);
    Object.assign(room, updateRoomDto); // Actualiza solo los campos proporcionados
    return this.roomsRepository.save(room);
  }

  // Obtener una habitación por ID
  async findOne(id: number): Promise<Rooms> {
    const room = await this.roomsRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  // Eliminar una habitación por ID
  async remove(id: number): Promise<void> {
    const room = await this.findOne(id);
    await this.roomsRepository.remove(room);
  }
}
