import { Response } from 'express';
import { SuccessResponseDto } from './dto/success.dto';
const successResponse = (
  response: Response,
  data: any | undefined,
  statusCode: number,
  message: string,
): Response<SuccessResponseDto> => {
  return response.status(statusCode).json({ data, message });
};
export default successResponse;
