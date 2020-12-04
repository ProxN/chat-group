export type LoginInputs = {
  email: string;
  password: string;
};

export interface RegisterInputs extends LoginInputs {
  name: string;
}

export type AddChannelInputs = {
  name: string;
  description: string;
};

export type SendMessageInputs = {
  text: string;
  channelId: string;
};
