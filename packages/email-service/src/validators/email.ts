import { IEmail } from '../app/app.service';

export const validateEmail = (email: IEmail) => {
  console.log(email?.from && email?.to && email?.subject && email?.html);
  console.log(
    Object.values(email).some(
      (value) => typeof value !== 'string' || !value.length
    )
  );
  if (
    email?.from &&
    email?.to &&
    email?.subject &&
    email?.html &&
    Object.values(email).some(
      (value) => typeof value !== 'string' || !value.length
    )
  ) {
    return false;
  }
  return true;
};
