import defaultImage from '../../../assets/MOC-data/BookImage.png';
import { IClaimHistory } from '../../models/helperFunctions/claimHistory';
import { StatusTypes } from '@mimir/global-types';
import { render } from '../../../helpers/customRender';
import { screen } from '@testing-library/react';
import Item from './Item';

describe('ClaimTable.Item', () => {
  const imgUrl = 'https://exmaple.com/image.png';
  const item: IClaimHistory = {
    material_id: 1,
    status: StatusTypes.FREE,
    created_at: new Date(),
    material: {
      id: '1',
      picture: imgUrl,
      author: 'Author',
      category: 'Category',
      title: 'Title',
    },
  };

  it('should have material image URL', () => {
    render(<Item item={item} />);
    expect(screen.getByTestId('coverImg')).toHaveAttribute('src', imgUrl);
  });

  it('should display default image when material misses one', () => {
    const material = item.material;
    if (material === undefined) throw Error();
    material.picture = undefined;

    render(<Item item={item} />);
    expect(screen.getByTestId('coverImg')).toHaveAttribute('src', defaultImage);
  });
});
