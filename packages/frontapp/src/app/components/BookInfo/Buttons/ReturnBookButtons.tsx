import React, { FC } from 'react';
import { ReactComponent as Claim } from '../../../../assets/claim.svg';
import Button from '../../Button';

interface IControl {
  isClaimed?: boolean;
  onClaim: () => void;
  onReturn: () => void;
  onProlong: () => void;
}

export const ReturnBookButtons: FC<IControl> = ({
  isClaimed = false,
  onClaim,
  onReturn,
  onProlong,
}) => {
  if (!isClaimed)
    return (
      <Button value="Claim a book" onClick={onClaim} svgComponent={<Claim />} />
    );

  return (
    <>
      <Button value="Return a book" onClick={onReturn} />
      <Button value="Extend claim period" onClick={onProlong} transparent />
    </>
  );
};
