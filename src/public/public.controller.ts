import { Controller, Get } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';

@Controller('public')
export class PublicController {
  constructor(private readonly booksService: BooksService) {}

  @Get('books')
  async findAll() {
    const books = await this.booksService.findAll();
    return books.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      ownerName: book.owner?.name,
    }));
  }
}
