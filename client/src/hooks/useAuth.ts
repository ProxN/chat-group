import { useMutation } from 'react-query';
import { IUser, IError } from '../types';
import { LoginInputs, RegisterInputs } from '../types/inputs';
import graphqlClient, { gql } from '../utils/graphqlClient';

interface AuthResponse extends IError {
  user: IUser;
}

interface ForgotPasswordRes extends IError {
  emailSent?: boolean;
}

const getQuery = () => ` 
    user {
        id
        email
        name
        avatar
    }
    error {
        field
        message
}`;

export const useLogin = () => {
  return useMutation(async (data: LoginInputs) => {
    const res = await graphqlClient.request<{ login: AuthResponse }>(
      gql`
           mutation logUser($email: String!, $password: String!) {
           login(email: $email, password: $password){
              ${getQuery()}
            }
           }`,
      data
    );

    return res.login;
  });
};

export const useRegister = () => {
  return useMutation(async (data: RegisterInputs) => {
    const res = await graphqlClient.request<{ register: AuthResponse }>(
      gql`
           mutation logUser($email: String!, $password: String!,$name:String!) {
            register(email: $email, password: $password,name:$name){
              ${getQuery()}
            }
          }`,
      data
    );

    return res.register;
  });
};

export const useForgotPassword = () => {
  return useMutation(async (data: { email: string }) => {
    const res = await graphqlClient.request<{ forgotPassword: ForgotPasswordRes }>(
      gql`
        mutation getResetToken($email: String!) {
          forgotPassword(email: $email) {
            emailSent
            error {
              field
              message
            }
          }
        }
      `,
      data
    );
    return res.forgotPassword;
  });
};

export const useResetPassword = () => {
  return useMutation(async (data: { password: string; token: string }) => {
    const res = await graphqlClient.request<{ resetPassword: AuthResponse }>(
      gql`
        mutation resetPassword($token: String!, $password: String!) {
          resetPassword(resetToken: $token, password: $password) {
           ${getQuery()}
          }
        }
      `,
      data
    );
    return res.resetPassword;
  });
};
