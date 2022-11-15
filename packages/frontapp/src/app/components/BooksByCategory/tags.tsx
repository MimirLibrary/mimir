import styled from '@emotion/styled';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Close } from '../../../assets/Close.svg';
import { useTranslation } from 'react-i18next';
import { dimensions } from '@mimir/ui-kit';

const Header = styled.h2`
  font-size: ${dimensions.xl_2};
  font-weight: 700;
`;

const StyledTags = styled.button`
  display: flex;
  align-items: center;
  gap: ${dimensions.xs_1};
  outline: none;
  border: none;
  border-radius: ${dimensions.xl};
  padding: ${dimensions.xs_2} ${dimensions.xl_2};
  background-color: blue;
  font-size: ${dimensions.base};
  max-height: ${dimensions.xl_6};
  width: fit-content;
  color: white;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${dimensions.base};

  @media (max-width: ${dimensions.phone_width}) {
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 4px;
    ::-webkit-scrollbar {
      height: 0;
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${dimensions.base};
  margin-bottom: ${dimensions.xl};
`;
const StyledCross = styled(Close)`
  cursor: pointer;
  width: ${dimensions.xl_3};
  height: ${dimensions.xl_3};
  filter: invert(1);
`;
interface IProps {
  chosenTags: string[];
  numOfResults: number;
}
const Tags: FC<IProps> = ({ chosenTags, numOfResults }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  let searchString = '';
  //intexes for mapping
  let indexes = 0;
  const onCrossClick = (tag: string) => {
    //changing url without refreshing page
    searchParams.forEach((value, key) => {
      if (value === tag) {
        //removing tag from url
        const searchArg = new URLSearchParams(tag).toString().slice(0, -1);
        const searchParamsAsString = searchParams
          .toString()
          .replace(`${key}=${searchArg}`, '');
        searchString = searchParamsAsString;
      }
    });
    setSearchParams(searchString);
  };
  return (
    <Wrapper data-testid="tags">
      <Header>
        {t('Readers.TitleFiltered')} - {numOfResults}
      </Header>
      <TagsWrapper>
        {chosenTags.map((tag) => {
          indexes++;
          return (
            <StyledTags key={indexes}>
              <StyledCross onClick={() => onCrossClick(tag)} />
              {tag}
            </StyledTags>
          );
        })}
      </TagsWrapper>
    </Wrapper>
  );
};

export default Tags;
