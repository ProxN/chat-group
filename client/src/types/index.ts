export interface IError {
  error?: {
    field: string;
    message: string;
  };
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}
