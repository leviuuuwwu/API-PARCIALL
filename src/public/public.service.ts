import { Injectable } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/book.entity';

@Injectable()
export class PublicService {
  constructor(private readonly booksService: BooksService) {}

  async getAllBooks(): Promise<Book[]> {
    return this.booksService.findAll(); 
  }
}
