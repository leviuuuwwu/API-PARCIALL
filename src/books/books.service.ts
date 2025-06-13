import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { User } from '../users/users.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(dto: CreateBookDto, owner: User): Promise<Book> {
    const book = this.bookRepository.create({ ...dto, owner });
    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
  return this.bookRepository.find({ relations: ['owner'] });
  }
}
