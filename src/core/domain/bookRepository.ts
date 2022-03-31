import { DBookRecord, BookRecord } from '@core/app/utils/typeUtils'
import { bookModel } from '@core/infra/database/book'

export class BookRepository {
  async createBook(data: BookRecord): Promise<DBookRecord> {
    return await bookModel.create(data)
  }
}

export const bookRepository = new BookRepository()