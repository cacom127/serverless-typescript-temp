import { AnyDocument } from "dynamoose/dist/Document";

export interface LambdaResponse {
  response_code: number
  response_message: string
  data?: any
}

export interface BookRecord {
  book_id: string
  name: string
}

export interface CreateBookRequest {
  name: string
}

export interface DBookRecord extends AnyDocument, BookRecord {}