import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Valida que solo se tomen en cuenta los campos que tenemos declarados
      forbidNonWhitelisted: true, // Valida que si enviaste algun parametro adicional mande una advertencia
      errorHttpStatusCode: 406,
      stopAtFirstError: true, // Si manda varios errores de una misma propiedad, no muestra el 1ro (con 1 es suficiemte)
      disableErrorMessages: false,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
