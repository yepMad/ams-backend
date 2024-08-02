import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';

import FastifyHelmet from '@fastify/helmet';
import FastifyMultipart from '@fastify/multipart';

import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(FastifyHelmet);
  await app.register(FastifyMultipart);

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    exposedHeaders: [],
    origin: {
      production: [/\.amslogistica\.com$/],
      staging: [/\.amslogistica\.com$/, 'http://127.0.0.1:5173'],
      development: ['http://localhost:5000', 'http://127.0.0.1:5173'],
    }[process.env.APP_ENV],
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
