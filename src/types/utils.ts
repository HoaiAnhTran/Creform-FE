export interface SuccessResponse<T> {
  message: string;
  data: T;
  metadata: T;
}

export interface ErrorResponse<T> {
  message: string;
  data: T;
}
