import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateBookDto, @Request() req) {
    return this.booksService.create(dto, {
        id: req.user.userId,
        email: '',
        name: '',
        password: '',
        books: []
    });
  }
}
