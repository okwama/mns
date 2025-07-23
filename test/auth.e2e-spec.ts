import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'TestPass123!',
    fullName: 'Test User',
    avatarUrl: 'https://example.com/avatar.png',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a new user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send(testUser)
      .expect(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(testUser.email);
    expect(res.body.username).toBe(testUser.username);
  });

  it('should not allow duplicate registration (email)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...testUser, username: 'anotheruser' })
      .expect(409);
    expect(res.body.message).toMatch(/email/i);
  });

  it('should not allow duplicate registration (username)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...testUser, email: 'another@example.com' })
      .expect(409);
    expect(res.body.message).toMatch(/username/i);
  });

  it('should login with email', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ identifier: testUser.email, password: testUser.password })
      .expect(201);
    expect(res.body).toHaveProperty('access_token');
  });

  it('should login with username', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ identifier: testUser.username, password: testUser.password })
      .expect(201);
    expect(res.body).toHaveProperty('access_token');
  });

  it('should not login with wrong password', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ identifier: testUser.email, password: 'wrongpass' })
      .expect(401);
  });
}); 