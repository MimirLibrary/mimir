import { validateEmail } from '../validators/validateEmail';

describe('Validators', () => {
  describe('validateEmail function', () => {
    const emailTestFirstVariant = {
      from: '"Mimir App" <app@mimirapp.xyz>',
      to: 'maksim.staliarou@itechart-group.com',
      subject: 'Overdue books | Mimir App',
      html: '<p>Super text</p>',
    };

    const emailTestSecondVariant = {
      from: '',
      to: 'maksim.staliarou@itechart-group.com',
      subject: 'Overdue books | Mimir App',
      html: '<p>Super text</p>',
    };

    const emailTestThirdVariant = {
      from: '"Mimir App" <app@mimirapp.xyz>',
      to: 'maksim.staliarou@itechart-group.com',
      subject: 'Overdue books | Mimir App',
      html: '<p>Super text</p>',
      something: '',
    };

    it('should return true if everything is correct', () => {
      expect(validateEmail(emailTestFirstVariant)).toBeTruthy();
    });

    it('should return false if some value of prop empty string', () => {
      expect(validateEmail(emailTestSecondVariant)).toBeFalsy();
    });

    it('should return false if length of keys uncorrect', () => {
      expect(validateEmail(emailTestThirdVariant)).toBeFalsy();
    });
  });
});
