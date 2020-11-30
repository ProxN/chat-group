import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router';
import AuthBox from '@components/AuthBox';
import Flex from '@components/Flex';
import Input from '@components/Input';
import Text from '@components/Text';
import Button from '@components/Button';
import { useResetPassword } from '@hooks/useAuth';

const Form = styled.form`
  margin-top: 2rem;
  button {
    margin-top: 1rem;
  }
`;

interface INewPassword {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const { handleSubmit, errors, control } = useForm<INewPassword>({
    reValidateMode: 'onSubmit',
  });

  const [mutate, { data, isLoading }] = useResetPassword();

  const onSubmit = (inputs: INewPassword): void => {
    const { confirmPassword, password } = inputs;
    if (password !== confirmPassword) {
      setError("Password confirmation doesn't match the password");
    } else if (inputs.password === inputs.confirmPassword) {
      mutate({
        password,
        token: router.query.token as string,
      });
      setError('');
    }
  };

  useEffect(() => {
    if (data?.user) {
      router.push('/');
    }
  }, [isLoading]);

  return (
    <Flex justify='center' align='center' fullWidth height='100%'>
      <AuthBox hideAuthLinks width='40rem' title='Change Password'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={(props) => (
              <Input placeholder='Password' type='password' fullWidth {...props} />
            )}
            name='password'
            control={control}
            rules={{
              required: 'Password is required!',
            }}
            defaultValue=''
          />
          <Controller
            render={(props) => (
              <Input placeholder='Confirm password' type='password' fullWidth {...props} />
            )}
            name='confirmPassword'
            control={control}
            rules={{
              required: 'confirm password is required!',
            }}
            defaultValue=''
          />
          <ErrorMessage errors={errors} name='password' as={<Text status='danger' />} />
          {error && <Text status='danger'>{error}</Text>}
          {data?.error && <Text status='danger'>{data.error.message}</Text>}

          <Button disabled={isLoading} type='submit' fullWidth status='primary'>
            {isLoading ? 'changing password' : 'Change Password'}
          </Button>
        </Form>
      </AuthBox>
    </Flex>
  );
};

export default ResetPassword;
