export interface CustomOkxResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T[];
}
