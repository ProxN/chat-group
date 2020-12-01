import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@components/Button';
import Flex from '@components/Flex';
import Input from '@components/Input';
import { useModalStore } from '@store/index';
import { AddChannelInputs } from 'types/inputs';
import Text from '@components/Text';
import { useAddChannel } from '@hooks/useChannel';
import { useEffect } from 'react';

const AddChannel = () => {
  const { closeModal } = useModalStore();
  const { control, handleSubmit, errors } = useForm<AddChannelInputs>({
    reValidateMode: 'onSubmit',
  });

  const [mutate, { data, isLoading }] = useAddChannel();

  const onSubmit = (inputs: AddChannelInputs) => {
    mutate(inputs);
  };

  useEffect(() => {
    if (data?.channel) {
      closeModal();
    }
  }, [isLoading]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={(props) => <Input placeholder='Channel Name' type='text' fullWidth {...props} />}
        name='name'
        control={control}
        rules={{
          required: 'name is required',
        }}
      />
      <Controller
        render={(props) => (
          <Input.TextArea fullWidth placeholder='Channel Description' {...props} />
        )}
        name='description'
        control={control}
        rules={{
          required: 'Description is required',
        }}
      />
      <ErrorMessage
        errors={errors}
        name={errors.name ? 'name' : 'description'}
        as={<Text status='danger' />}
      />
      {data && data.error && <Text status='danger'>{data.error.message}</Text>}
      <Flex justify='flex-end'>
        <Button onClick={closeModal} margin='0 1rem 0 0'>
          Cancal
        </Button>
        <Button disabled={isLoading} type='submit' status='primary'>
          {isLoading ? 'Saving' : 'save'}
        </Button>
      </Flex>
    </form>
  );
};

export default AddChannel;
