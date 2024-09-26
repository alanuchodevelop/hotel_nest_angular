import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from './entities/reservations.entity';
import { Users } from './entities/users.entity';
import { Rooms } from './entities/rooms.entity';

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
        username: configService.get('DB_USERNAME'),  // Aquí debería ser 'postgres'
        password: configService.get('DB_PASSWORD') || '',  // Si la contraseña está vacía
        database: configService.get('DB_NAME'),
        entities: [Reservations, Users, Rooms],
        autoLoadEntities: true,  // Puedes activar esto si estás usando entidades
        synchronize: true,  // Solo en desarrollo
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
