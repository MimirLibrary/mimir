import { screen } from '@testing-library/react';
import { render } from '../../../helpers/customRender';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import BookCard from './index';
import { useTranslation } from 'react-i18next';

describe('BookCard Component', () => {
  const { t } = useTranslation();

  it('should render correctly', () => {
    render(<BookCard src={bookImage} />);
    expect(screen.getByTestId('bookCard')).toBeInTheDocument();
  });

  it('always render Book Status', () => {
    render(<BookCard src={bookImage} status="Free" />);
    expect(screen.getByTestId('bookStatus')).toBeInTheDocument();
    expect(screen.getByTestId('bookStatus')).toHaveTextContent(
      t('Statuses.Free')
    );
  });

  it('if the picture is not given, use the default one', () => {
    render(<BookCard />);
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
      />
    );
    expect(screen.getByTestId('bookCard')).toMatchSnapshot();
  });
});
