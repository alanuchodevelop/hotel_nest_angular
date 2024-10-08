// src/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from '../entities/rooms.entity';
import { Users } from '../entities/users.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Rooms)
    private roomRepository: Repository<Rooms>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async seedRooms() {
    const rooms: Partial<Rooms>[] = [
      { room_number: '101', description: 'Single Room', available: true },
      { room_number: '102', description: 'Double Room', available: false },
      { room_number: '103', description: 'Suite', available: true },
    ];

    await this.roomRepository.save(rooms);
  }

  async seedUsers() {
    const users: Partial<Users>[] = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone_number: '123456789',
      },
    ];
    await this.usersRepository.save(users);
  }
}
