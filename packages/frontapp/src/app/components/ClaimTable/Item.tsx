import InlineWrapper from './InlineWrapper';
import defaultImage from '../../../assets/MOC-data/BookImage.png';
import styled from '@emotion/styled';
import { IClaimHistory } from '../../models/helperFunctions/claimHistory';
import { StatusTypes } from '@mimir/global-types';
import { colors, dimensions } from '@mimir/ui-kit';
import { getDates } from '../../models/helperFunctions/converTime';
import { t } from 'i18next';

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IFieldsTextProps {
  overdue?: boolean;
  returned?: boolean;
  titlee?: boolean;
  secondary?: boolean;
}

const FieldsText = styled.p<IFieldsTextProps>`
  font-weight: ${({ secondary }) => (secondary ? 300 : 500)};
  font-size: ${({ titlee }) => (titlee ? dimensions.base : dimensions.sm)};
  color: ${({ overdue, returned, titlee, secondary }) =>
    titlee || secondary
      ? colors.main_black
      : overdue
      ? colors.problem_red
      : returned
      ? colors.free_book
      : null};
  margin-bottom: ${dimensions.xs_2};
`;

const countReturnDate = (created_at: Date) => {
  const day = `${getDates(created_at).returnDate.getDate()}`.padStart(2, '0');
  const month = `${getDates(created_at).returnDate.getMonth() + 1}`.padStart(
    2,
    '0'
  );
  return `${t('UserCard.Table.ReturnTill')} ${day}.${month}`;
};

const countReturnedDate = (created_at: Date) => {
  const day = `${getDates(created_at).startDate.getDate()}`.padStart(2, '0');
  const month = `${getDates(created_at).returnDate.getMonth() + 1}`.padStart(
    2,
    '0'
  );
  return `${t('UserCard.Table.ReturnedAt')} ${day}.${month}`;
};

type Props = { item: IClaimHistory };

export default function Item({ item }: Props) {
  const material = item.material;
  const coverUrl = material?.picture
    ? `${item.material?.picture}`
    : defaultImage;

  return (
    <table>
      <tbody>
        <tr key={String(item.created_at)}>
          <td>
            <InlineWrapper>
              <img data-testid="coverImg" src={coverUrl} />
              <ColumnWrapper>
                <FieldsText titlee>{material?.title}</FieldsText>
                <FieldsText
                  secondary
                >{`${material?.category} / ${material?.author}`}</FieldsText>
              </ColumnWrapper>
            </InlineWrapper>
          </td>
          <td>
            {item.status !== StatusTypes.FREE ? (
              <FieldsText>{countReturnDate(item.created_at)}</FieldsText>
            ) : (
              <FieldsText returned>
                {countReturnedDate(item.created_at)}
              </FieldsText>
            )}
          </td>
          <td>
            {item.status === StatusTypes.FREE ? (
              <FieldsText returned>{t('UserCard.Table.Returned')}</FieldsText>
            ) : item.status === StatusTypes.OVERDUE ? (
              <FieldsText overdue>{t('UserCard.Table.Overdue')}</FieldsText>
            ) : (
              <FieldsText>
                {item.status === StatusTypes.BUSY
                  ? t('UserCard.Table.Claim')
                  : t('UserCard.Table.Prolong')}
              </FieldsText>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
