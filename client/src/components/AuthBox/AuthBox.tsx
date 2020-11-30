import Text from '@components/Text';
import Link from '@components/Link';
import { AuthBoxContainer, AuthBoxTitle, AuthInfo } from './AuthBox.styles';

const info = {
  login: {
    text: 'Don’t have an account yet?',
    href: '/register',
    linkText: 'Register',
  },
  register: {
    text: 'Adready a member?',
    href: '/login',
    linkText: 'Login',
  },
};

interface AuthBoxProps {
  width?: string;
  title?: string;
  page?: 'login' | 'register';
  hideAuthLinks?: boolean;
}

const AuthBox: React.FC<AuthBoxProps> = (props) => {
  const { children, width, title, hideAuthLinks, page } = props;
  return (
    <AuthBoxContainer width={width}>
      <AuthBoxTitle>{title}</AuthBoxTitle>
      {children}
      <AuthInfo>
        {!hideAuthLinks && page && (
          <>
            <Text appearance='hint'>
              {info[page].text}
              <Link href={info[page].href}>
                &nbsp;
                {info[page].linkText}
              </Link>
            </Text>
            <Link href='/forgot_password'>Forgot Password?</Link>
          </>
        )}
      </AuthInfo>
    </AuthBoxContainer>
  );
};

AuthBox.defaultProps = {
  page: 'login',
  hideAuthLinks: false,
};

export default AuthBox;
