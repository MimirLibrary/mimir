import React, { FC } from 'react';
import { StyledButton } from './index';
import { ReactComponent as Claim } from '../../../assets/claim.svg';

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
      <StyledButton
        value="Claim a book"
        onClick={onClaim}
        svgComponent={<Claim />}
      />
    );

  return (
    <>
      <StyledButton value="Return a book" onClick={onReturn} />
      <StyledButton
        value="Extend claim period"
        onClick={onProlong}
        transparent
      />
    </>
  );
};
