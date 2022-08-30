import { IEmail } from '../app/app.service';

const defaultEmailKeys = ['from', 'to', 'subject', 'html'];

export const validateEmail = (email: IEmail) => {
  const emailKeys = Object.keys(email);
  if (
    emailKeys.some((value) => !emailKeys.includes(value)) ||
    Object.values(email).some(
      (value) => typeof value !== 'string' || !value.length
    ) ||
    emailKeys.length !== defaultEmailKeys.length
  ) {
    return false;
  }
  return true;
};
