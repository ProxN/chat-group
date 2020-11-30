import { ButtonProps } from './types';
import StyledButton from './Button.styles';

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

Button.defaultProps = {
  Size: 'default',
  fullWidth: false,
  type: 'button',
  borderRadius: '8px',
  status: 'default',
  disabled: false,
};

export default Button;
