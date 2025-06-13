import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [BooksModule], 
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}