import React, { FC } from 'react';

interface IManagerInfoField {
  title: string;
  description: string;
  person_id: number;
  answer?: boolean;
}

const ManagerInfoField: FC<IManagerInfoField> = ({
  title,
  description,
  person_id,
  answer = 'false',
}) => {
  return <></>;
};

export default React.memo(ManagerInfoField);
