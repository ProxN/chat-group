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

export interface IChannel {
  id: string;
  name: string;
  description: string;
}

export interface IMesssage {
  id: string;
  message: string;
  userId: string;
  createdAt: string;
  user: IUser;
}
