import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import Input from '../Input';

const WrapperClaimOperation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TitleOfClaim = styled.h3`
  font-weight: 700;
  color: ${colors.main_black};
  line-height: ${dimensions.xl_3};
  font-size: ${dimensions.xl_2};
`;

const Description = styled.p`
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

const InputISBN = styled(Input)`
  width: 19rem;
  border: none;
  outline: none;
  margin-left: ${dimensions.xs_2};
  color: ${colors.main_black};
  font-family: ${fonts.primary}, sans-serif;
  margin-right: 0.12rem;

  @media (max-width: ${dimensions.tablet_width}) {
    margin-left: -${dimensions.xl};
  }
`;

const WrapperInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 21.5rem;
  width: 100% - 100px;
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  padding: 10px 0;
  padding-left: ${dimensions.xs_1};
  margin: 0 ${dimensions.xs_1};
  background: ${colors.bg_secondary};

  :hover {
    border: 0.5px solid ${colors.accent_color};
  }
  :focus {
    border: 0.5px solid ${colors.accent_color};
  }

  @media (max-width: ${dimensions.tablet_width}) {
    width: 100%;
  }

  @media (max-width: ${dimensions.phone_width}) {
    width: 70%;
  }
`;

const ClaimOperation = () => {
  const [valueIsISBN, setValueIsISBN] = useState<string>('');

  const handleChangeISBNInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueIsISBN(e.target.value);
  };

  return (
    <WrapperClaimOperation>
      <TitleOfClaim>Enter ISBN code</TitleOfClaim>
      <Description>
        Look at the back of the book for the code and write it in the box.
      </Description>
      <WrapperInput>
        <InputISBN
          value={valueIsISBN}
          type="text"
          onChange={handleChangeISBNInput}
        />
      </WrapperInput>
    </WrapperClaimOperation>
  );
};

export default ClaimOperation;
