import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reservations } from './entities/reservations.entity';
import { Users } from './entities/users.entity';
import { Rooms } from './entities/rooms.entity';
import { SeederService } from './seeder/seeder.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ReservationsService } from './reservations/reservations.service';
import { ReservationsController } from './reservations/reservations.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD') || '',
        database: configService.get('DB_NAME'),
        entities: [Reservations, Users, Rooms],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Rooms, Users, Reservations]), // Asegúrate de incluir las entidades Rooms y Users
  ],
  controllers: [RoomsController, UsersController, ReservationsController],
  providers: [RoomsService, UsersService, SeederService, ReservationsService], // Asegúrate de que SeederService esté registrado
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    await this.seederService.seedRooms();  // Inserta habitaciones
    await this.seederService.seedUsers();  // Inserta usuarios
  }
}
