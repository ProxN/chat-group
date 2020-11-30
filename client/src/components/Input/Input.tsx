import { forwardRef } from 'react';
import SearchIcon from '@assets/search.svg';
import { InputProps, CompoundedComponent, TextAreaProps } from './types';
import {
  InputBox,
  SvgIcon,
  StyledInput,
  InputContainer,
  Label,
  TextArea as StyledTextArea,
  SearchInput,
} from './Input.styles';

const InputWrapper: React.FC<{ label?: string; margin?: string }> = (props) => {
  const { children, label, margin } = props;
  return (
    <InputContainer margin={margin}>
      {label && <Label>{label}</Label>}
      {children}
    </InputContainer>
  );
};

export type Ref = HTMLInputElement;
export type TextRef = HTMLTextAreaElement;

const Input = forwardRef<Ref, InputProps>(
  (props, ref): React.ReactElement => {
    const { onChange, icon, label, margin, ...rest } = props;

    return (
      <InputWrapper margin={margin} label={label}>
        <InputBox>
          {icon && <SvgIcon>{icon}</SvgIcon>}
          <StyledInput
            autoComplete='off'
            ref={ref}
            onChange={onChange}
            withIcon={!!icon}
            {...rest}
          />
        </InputBox>
      </InputWrapper>
    );
  }
) as CompoundedComponent;

const TextArea = forwardRef<TextRef, TextAreaProps>(
  (props, ref): React.ReactElement => {
    const { onChange, label, ...rest } = props;

    return (
      <InputWrapper label={label}>
        <StyledTextArea onChange={onChange} ref={ref} {...rest} />
      </InputWrapper>
    );
  }
);

const Search = forwardRef<Ref, InputProps>(
  (props, ref): React.ReactElement => {
    const { onChange, icon, label, value, ...rest } = props;

    return (
      <InputWrapper label={label}>
        <InputBox>
          <SvgIcon>
            <SearchIcon />
          </SvgIcon>
          <SearchInput ref={ref} onChange={onChange} withIcon={!!icon} {...rest} />
        </InputBox>
      </InputWrapper>
    );
  }
);

TextArea.defaultProps = {
  Size: 'default',
  borderRadius: '8px',
  type: 'text',
  fullWidth: false,
};

Input.defaultProps = {
  Size: 'default',
  borderRadius: '8px',
  type: 'text',
  fullWidth: false,
  value: '',
};

Search.defaultProps = {
  Size: 'default',
  borderRadius: '8px',
  type: 'text',
  fullWidth: false,
  value: '',
};

Input.Search = Search;

Input.TextArea = TextArea;

export default Input;
