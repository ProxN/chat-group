export const isEmail = (email: string) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return email.match(regex);
};

const validate = (email: string, password: string) => {
  if (!email || !password) {
    return {
      field: 'emailOrPassword',
      message: 'Missing required fields!',
    };
  }

  if (!isEmail(email)) {
    return {
      field: 'email',
      message: 'Please provide a valid email!',
    };
  }

  if (password.length <= 6) {
    return {
      field: 'password',
      message: 'Password length must be greater than 6',
    };
  }

  return null;
};

export default validate;
