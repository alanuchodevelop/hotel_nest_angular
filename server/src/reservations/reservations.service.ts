import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservations } from '../entities/reservations.entity';
import { CreateReservationDto } from './create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservations)
    private reservationsRepository: Repository<Reservations>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservations> {
    const reservation = this.reservationsRepository.create(createReservationDto);
    return this.reservationsRepository.save(reservation);
  }

  async findAll(): Promise<Reservations[]> {
    return this.reservationsRepository.find();
  }

  async findOne(id: number): Promise<Reservations> {
    return this.reservationsRepository.findOne({
      where: { id }
    });
  }


  async update(id: number, updateReservationDto: CreateReservationDto): Promise<Reservations> {
    const reservation = await this.reservationsRepository.preload({
      id: id,
      ...updateReservationDto,
    });
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    return this.reservationsRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);
    this.reservationsRepository.remove(reservation);
  }
}
