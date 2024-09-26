import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reservations } from './entities/reservations.entity';
import { Users } from './entities/users.entity';
import { Rooms } from './entities/rooms.entity';
import { SeederService } from './seeder/seeder.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    // Aquí se asegura que el repositorio de Room esté disponible
    TypeOrmModule.forFeature([Rooms]),
  ],
  controllers: [AppController, RoomsController],
  providers: [AppService, RoomsService, SeederService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    await this.seederService.seedRooms();
  }
}
