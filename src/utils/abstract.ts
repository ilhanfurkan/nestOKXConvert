export interface CustomOkxResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T[];
}
export interface AuthorizedUser {
  id: number;
  subAccount?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  mobileNumber?: string;
  role?: string;
  privileges?: string[];
  roleName?: string;
}

export interface RedisSession {
  id: string;
  apiConfiguration: string;
  user: string;
}
