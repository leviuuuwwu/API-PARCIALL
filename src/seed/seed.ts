import { DataSource } from 'typeorm';
import { User } from '../users/users.entity';
import { Book } from '../books/book.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT ?? 5432),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Book],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);

  const existing = await userRepo.findOneBy({ email: 'test@example.com' });
  if (existing) {
    console.log('Usuario ya existe, omitiendo...');
    return;
  }

  const user = userRepo.create({
    email: 'test@example.com',
    name: 'Usuario Test',
    password: '123456',
  });

  await userRepo.save(user);
  console.log('Usuario creado:', user);

  await dataSource.destroy();
}

seed();
