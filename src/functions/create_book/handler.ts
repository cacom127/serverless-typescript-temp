import 'source-map-support/register'
import { formatJSONResponse } from '@libs/apiGateway'
import { bookService } from '@core/app/service/bookService'
import { appUtils } from '@core/app/utils/appUtils'
import { middyfy } from '@libs/lambda'

const handler = async event => {
  const reqData = event.body
  const response = await bookService.createBook(reqData)
  if (response) {
    return formatJSONResponse(
      appUtils.buildSuccessMessage(response)
    )
  } else {
    return formatJSONResponse(
      appUtils.buildErrorMessage(500, "Internal Server Error")
    )
  }
}

export const main = middyfy(handler)