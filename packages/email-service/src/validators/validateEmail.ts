import { IEmail } from '../app/app.service';

export const validateEmail = (email: IEmail) => {
  if (!email.to) {
    return false;
  }
  if (!email.html && !email.template) {
    return false;
  }
  return true;
};
