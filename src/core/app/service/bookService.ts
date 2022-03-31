import { CreateBookRequest, BookRecord, DBookRecord } from '../utils/typeUtils'
import { BookRepository } from '@core/domain/bookRepository'
import { customAlphabet } from 'nanoid'
import Logger from '@core/infra/logging/logger'
const logger = Logger(__filename)
const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export class BookService {
  bookRepository: BookRepository
  constructor() {
    this.bookRepository = new BookRepository()
  }

  async createBook(request: CreateBookRequest): Promise<DBookRecord> {
    const bookRecord: BookRecord = {
      book_id: customAlphabet(ALPHABET, 6)(),
      name: request.name,
    }
    const result: DBookRecord = await this.bookRepository
      .createBook(bookRecord)
      .then((rs: DBookRecord) => {
        return rs
      })
      .catch(error => {
        logger.error(error)
        return null
      })
    return result
  }
}

export const bookService = new BookService()