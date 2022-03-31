import type {LambdaResponse} from './typeUtils'

class AppUtils {
  buildSuccessMessage(data?: any): LambdaResponse {
    return {
      response_code: 200,
      response_message: 'Success',
      data: data,
    }
  }

  buildErrorMessage(errorCode: number, errorMsg: string): LambdaResponse {
    return {
      response_code: errorCode,
      response_message: errorMsg,
    }
  }
}

export const appUtils = new AppUtils()
