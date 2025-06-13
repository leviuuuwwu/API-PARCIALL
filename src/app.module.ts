import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { PublicModule } from './public/public.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { Book } from './books/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +(process.env.DATABASE_PORT ?? 5432),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Book],
      synchronize: true,
    }),
    UsersModule,
    BooksModule,
    PublicModule,
    AuthModule,
  ],
})
export class AppModule {}
