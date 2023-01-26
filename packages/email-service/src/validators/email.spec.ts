import { validateEmail } from '../validators/validateEmail';

describe('Validators', () => {
  describe('validateEmail function', () => {
    const emailWithoutHtmlAndTemplate = {
      from: '"Mimir App" <app@mimirapp.xyz>',
      to: 'maksim.staliarou@itechart-group.com',
      subject: 'Overdue books | Mimir App',
    };

    const emailWithHtml = {
      from: '"Mimir App" <app@mimirapp.xyz>',
      to: 'maksim.staliarou@itechart-group.com',
      subject: 'Overdue books | Mimir App',
      html: '<p>Super text</p>',
    };

    const emailWithTemplate = {
      from: 'maksim.staliarou@itechart-group.com',
      to: 'maksim.staliarou@itechart-group.com',
      subject: 'Overdue books | Mimir App',
      template: 'template-name',
      context: {
        variable: 'value',
      },
    };

    it('should return true if html is present', () => {
      expect(validateEmail(emailWithHtml)).toBeTruthy();
    });

    it('should return true if template present', () => {
      expect(validateEmail(emailWithTemplate)).toBeTruthy();
    });

    it('should return false if html and template are missing', () => {
      expect(validateEmail(emailWithoutHtmlAndTemplate)).toBeFalsy();
    });
  });
});
