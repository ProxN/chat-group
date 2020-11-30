import styled from 'styled-components';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import AuthBox from '@components/AuthBox';
import Flex from '@components/Flex';
import Input from '@components/Input';
import Button from '@components/Button';
import Text from '@components/Text';
import { useForgotPassword } from '@hooks/useAuth';

const Form = styled.form`
  margin-top: 2rem;
  button {
    margin-top: 1rem;
  }
`;

interface EmailInput {
  email: string;
}

const ForgotPassword = () => {
  const { handleSubmit, errors, control } = useForm<EmailInput>({
    reValidateMode: 'onSubmit',
  });
  const [mutate, { data, isLoading }] = useForgotPassword();

  const onSubmit = (inputs: EmailInput): void => {
    mutate(inputs);
  };

  return (
    <Flex justify='center' align='center' fullWidth height='100%'>
      <AuthBox hideAuthLinks width='40rem' title='Forgot password'>
        {!data?.emailSent ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              render={(props) => (
                <Input placeholder='Enter your email address' type='email' fullWidth {...props} />
              )}
              name='email'
              control={control}
              rules={{
                required: 'Email is required',
              }}
            />
            <ErrorMessage errors={errors} name='email' as={<Text status='danger' />} />

            <Button disabled={isLoading} type='submit' fullWidth status='primary'>
              {isLoading ? 'Sending reset token' : 'Send password reset link'}
            </Button>
          </Form>
        ) : (
          <Flex direction='column'>
            <Text margin='2rem'>
              Check your email for a link to reset your password. If it doesn’t appear within a few
              minutes, check your spam folder.
            </Text>
            <Link href='/login'>
              <Button type='submit' fullWidth>
                Return to login
              </Button>
            </Link>
          </Flex>
        )}
      </AuthBox>
    </Flex>
  );
};

export default ForgotPassword;
