import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import Flex from '@components/Flex';
import AuthBox from '@components/AuthBox';
import Input from '@components/Input';
import Button from '@components/Button';
import Text from '@components/Text';
import LockSVG from '@assets/lock.svg';
import MailSVG from '@assets/mail.svg';
import { useLogin } from '@hooks/useAuth';
import { LoginInputs } from 'types/inputs';

const Form = styled.form`
  margin-top: 2rem;
  button {
    margin-top: 1rem;
  }
`;

const Login = () => {
  const router = useRouter();
  const { handleSubmit, errors, control } = useForm<LoginInputs>({
    reValidateMode: 'onSubmit',
  });
  const [mutate, { data, isLoading }] = useLogin();

  const onSubmit = (inputs: LoginInputs): void => {
    mutate(inputs);
  };

  useEffect(() => {
    if (!isLoading) {
      if (data && data.user) {
        router.push('/');
      }
    }
  }, [isLoading]);

  return (
    <Flex justify='center' align='center' fullWidth height='100%'>
      <AuthBox width='40rem' title='login'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={(props) => (
              <Input placeholder='Email' type='email' icon={<MailSVG />} fullWidth {...props} />
            )}
            name='email'
            control={control}
            rules={{
              required: 'Email is required',
            }}
            defaultValue=''
          />
          <Controller
            render={(props) => (
              <Input
                placeholder='Password'
                type='password'
                icon={<LockSVG />}
                fullWidth
                {...props}
              />
            )}
            name='password'
            control={control}
            rules={{
              required: 'Password is required',
            }}
            defaultValue=''
          />
          <ErrorMessage
            errors={errors}
            name={errors.email ? 'email' : 'password'}
            as={<Text status='danger' />}
          />
          {data && data.error && <Text status='danger'>{data.error.message}</Text>}
          <Button type='submit' fullWidth status='primary'>
            {isLoading ? 'logging' : 'login'}
          </Button>
        </Form>
      </AuthBox>
    </Flex>
  );
};

export default Login;
