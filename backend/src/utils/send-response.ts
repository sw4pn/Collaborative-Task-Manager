import { Response } from "express";

/**
 * Send uniform response
 */

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T
) => {
  const response: ApiResponse<T> = {
    success,
    message,
    ...(!data !== undefined && { data }),
  };

  return res.status(statusCode).json(response);
};

export default sendResponse;
