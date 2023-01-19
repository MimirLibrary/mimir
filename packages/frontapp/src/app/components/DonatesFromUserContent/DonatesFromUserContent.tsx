import { t } from 'i18next';
import { SubTitle, TitleInfo } from '../DonateBookFlow';
import ConditionalWrapper from '../ConditionalWrapper';
import { BookHolder } from '../BookInfo';
import OneDonator from '../OneDonatedBookPreview';
import React, { Dispatch, FC, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useMediaQuery } from 'react-responsive';
import { Material } from '@mimir/apollo-client';

interface DonatesFromUserContentProps {
  items: Material[];
  search: string;
  setShownId: Dispatch<SetStateAction<number[]>>;
  shownId: Array<number>;
}

interface TitleProps {
  flex?: number;
}

const ColumnHeader = styled.div`
  display: flex;
  border-radius: 10px 10px 0 0;
  background-color: ${colors.accent_color};
  padding: ${dimensions.xl};
`;
const Column = styled.h4<TitleProps>`
  font-size: ${dimensions.base};
  font-weight: 600;
  color: ${colors.bg_secondary};
  flex: ${({ flex }) => flex};
  @media (max-width: ${dimensions.phone_width}) {
    flex: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${dimensions.phone_width}) {
    top: calc(-6.5rem + 24px);
    position: relative;
  }
`;

const DonatesFromUserContent: FC<DonatesFromUserContentProps> = ({
  items,
  search,
  setShownId,
  shownId,
}) => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${dimensions.phone_width})`,
  });

  return (
    <Container>
      <TitleInfo>{t('Donates.Title')}</TitleInfo>
      <SubTitle>{t('Donates.Description')}</SubTitle>
      <ConditionalWrapper
        condition={!isMobile}
        wrapper={(children) => (
          <BookHolder>
            <ColumnHeader>
              <Column flex={3}>{t('TableHeader.ItemName')}</Column>
              <Column flex={1}>{t('TableHeader.UserName')}</Column>
              <Column flex={1}>{t('TableHeader.State')}</Column>
            </ColumnHeader>
            {children}
          </BookHolder>
        )}
      >
        <>
          {items &&
            items?.map((donate: any, index: number) => {
              return (
                <OneDonator
                  search={search}
                  setShownId={setShownId}
                  shownId={shownId}
                  identifier={donate.identifier}
                  title={donate.title}
                  statuses={donate.statuses}
                  key={donate.identifier}
                  id={donate.id}
                  index={index}
                  picture={donate.picture}
                  description={donate.description}
                />
              );
            })}
        </>
      </ConditionalWrapper>
    </Container>
  );
};

export default DonatesFromUserContent;
