import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 5000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  app.use((req, res, next) => {
    console.log('[Global] Incoming request:', req.method, req.url, req.headers['authorization']);
    next();
  });
}
bootstrap();
