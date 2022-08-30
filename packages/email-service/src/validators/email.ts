import { IEmail } from '../app/app.service';

const emailKeys = ['from', 'to', 'subject', 'html'];

export const validateEmail = (email: IEmail) => {
  if (
    Object.keys(email).some((value) => !emailKeys.includes(value)) ||
    Object.values(email).some(
      (value) => typeof value !== 'string' || !value.length
    )
  ) {
    return false;
  }
  return true;
};
