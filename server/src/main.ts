import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Reservas')
    .setDescription('Documentación de la API de reservas de habitaciones')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Expondrá Swagger en la ruta /api

  await app.listen(3000);
}
bootstrap();
