import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import Flex from '@components/Flex';
import AuthBox from '@components/AuthBox';
import Input from '@components/Input';
import Button from '@components/Button';
import Text from '@components/Text';
import LockSVG from '@assets/lock.svg';
import MailSVG from '@assets/mail.svg';
import UserSVG from '@assets/user.svg';
import { useRegister } from '@hooks/useAuth';
import { RegisterInputs } from 'types/inputs';

const Form = styled.form`
  margin-top: 2rem;
  button {
    margin-top: 1rem;
  }
`;

const Register = () => {
  const router = useRouter();
  const { handleSubmit, errors, control } = useForm<RegisterInputs>({
    reValidateMode: 'onSubmit',
  });
  const [mutate, { data, isLoading }] = useRegister();

  const onSubmit = (inputs: RegisterInputs): void => {
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
      <AuthBox page='register' width='40rem' title='sign up'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={(props) => (
              <Input placeholder='Name' type='text' icon={<UserSVG />} fullWidth {...props} />
            )}
            name='name'
            control={control}
            rules={{
              required: 'Name is required',
            }}
          />
          <Controller
            render={(props) => (
              <Input placeholder='Email' type='email' icon={<MailSVG />} fullWidth {...props} />
            )}
            name='email'
            control={control}
            rules={{
              required: 'Email is required',
            }}
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
          />
          <ErrorMessage
            errors={errors}
            // eslint-disable-next-line no-nested-ternary
            name={errors.name ? 'name' : errors.email ? 'email' : 'password'}
            as={<Text status='danger' />}
          />
          {data && data.error && <Text status='danger'>{data.error.message}</Text>}
          <Button type='submit' fullWidth status='primary'>
            {isLoading ? 'signing' : 'Sign up'}
          </Button>
        </Form>
      </AuthBox>
    </Flex>
  );
};

export default Register;
