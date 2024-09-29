import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS con opciones específicas
  app.enableCors({
    origin: 'http://localhost:4200',  // Solo permitir solicitudes desde este origen
    methods: 'GET,POST,PUT,DELETE,PATCH',  // Métodos HTTP permitidos
    credentials: true,  // Si necesitas enviar cookies o autenticación
  });
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
