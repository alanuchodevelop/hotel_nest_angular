import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from '../entities/rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private roomRepository: Repository<Rooms>,
  ) {}

  findAll(): Promise<Rooms[]> {
    return this.roomRepository.find();
  }
}
