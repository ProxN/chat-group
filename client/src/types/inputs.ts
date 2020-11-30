export type LoginInputs = {
  email: string;
  password: string;
};

export interface RegisterInputs extends LoginInputs {
  name: string;
}
