import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import BookCard from './index';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string | null) => str,
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            return;
          }),
      },
    };
  },
}));

describe('BookCard Component', () => {
  const { t } = useTranslation();

  it('should render correctly', () => {
    render(<BookCard src={bookImage} />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByTestId('bookCard')).toBeInTheDocument();
  });

  it('always render Book Status', () => {
    render(<BookCard src={bookImage} status="Free" />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByTestId('bookStatus')).toBeInTheDocument();
    expect(screen.getByTestId('bookStatus')).toHaveTextContent(
      t('Statuses.Free')
    );
  });

  it('if the picture is not given, use the default one', () => {
    render(<BookCard />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByTestId('bookImage')).toHaveAttribute('src', bookImage);
  });

  it('renders correctly, with snapshots', () => {
    render(
      <BookCard
        src={bookImage}
        title="The test book"
        status="Free"
        author="Test"
        category="Test"
        id="31"
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(screen.getByTestId('bookCard')).toMatchSnapshot();
  });
});
