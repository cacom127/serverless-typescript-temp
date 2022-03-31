import { Schema, model } from 'dynamoose'
import { DBookRecord } from 'src/core/app/utils/typeUtils'

const schema = new Schema(
  {
    book_id: {
      type: String,
      hashKey: true,
      required: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

export const bookModel = model<DBookRecord>(
  `${process.env.STAGE}-book`,
  schema,
  {create: false}
)