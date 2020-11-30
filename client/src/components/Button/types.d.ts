import { Size, Status } from '../types';

export interface StylesProps {
  Size?: Size;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  borderRadius?: string;
  status?: Status;
  margin?: string;
}

export interface ButtonProps extends StylesProps {
  onClick?: () => void;
  disabled?: boolean;
}
