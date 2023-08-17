import { CommonResponse } from 'src/common/types/common-response.types';

export class ResponseHandler {
  public static success<T>(
    data: T,
    message: string | string[],
    statusCode: number,
  ): CommonResponse<T> {
    return {
      status: true,
      statusCode,
      message,
      data,
      error: [],
    };
  }

  static error<T>(
    error: T,
    message: string | string[],
    statusCode: number,
  ): CommonResponse<T> {
    return {
      status: false,
      statusCode,
      message,
      data: [],
      error,
    };
  }
}
