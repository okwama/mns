import { createNestServer } from './main.nest';

async function bootstrap() {
  const app = await createNestServer();
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`.Server running on port ${port}...`);
  });
}
bootstrap();
