import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../entities/users.entity';
import { Rooms } from '../entities/rooms.entity';

@Entity('reservations')  // Definimos el nombre de la tabla como 'reservations'
export class Reservations {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Rooms, (room) => room.id)
  @JoinColumn({ name: 'room_id' })
  room: Rooms;

  @Column({ type: 'date' })  // Cambiar el tipo a 'date'
  start_date: Date;  // Cambiar a tipo 'Date'

  @Column({ type: 'date' })  // Cambiar el tipo a 'date'
  end_date: Date;  // Cambiar a tipo 'Date'

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
