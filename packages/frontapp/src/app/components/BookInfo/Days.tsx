import { t } from 'i18next';
import { FC } from 'react';

interface IDays {
  number: number;
}

const Days: FC<IDays> = ({ number }) => {
  if ([1, 21, 31].includes(number)) return t('Days.One');
  if ([2, 3, 4, 22, 23, 24].includes(number)) return t('Days.Many2');
  return t('Days.Many1');
};

export default Days;
