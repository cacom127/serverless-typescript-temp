import {handlerPath} from '@libs/handlerResolver'
import createBookSchema from '@core/app/schemas/createBookSchema'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  name: '${opt:stage, "dev"}-demo-create-book',
  events: [
    {
      http: {
        method: 'post',
        path: '/book',
        request: {
          schemas: {
            'application/json': createBookSchema,
          }
        }
      } 
    }
  ]
}