export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  role: string;
  avatar: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;

export interface EmailCheckRequest {
  email: string;
}

export interface EmailCheckResponse {
  isAvailable: boolean;
  message?: string;
}
