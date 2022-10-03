import styled from '@emotion/styled';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Close } from '../../../assets/Close.svg';
import { useTranslation } from 'react-i18next';

const Header = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const StyledTags = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  outline: none;
  border: none;
  border-radius: 20px;
  padding: 8px 24px;
  background-color: blue;
  font-size: 16px;
  max-height: 40px;
  width: fit-content;
  color: white;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;
const StyledCross = styled(Close)`
  cursor: pointer;
  width: 30px;
  height: 30px;
  filter: invert(1);
`;
interface IProps {
  chosenTags: string[];
  numOfResults: number;
}
const Tags: FC<IProps> = ({ chosenTags, numOfResults }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  let str = '';
  //intexes for mapping
  let indexes = 0;
  const onCrossClick = (tag: string) => {
    //changing url without refreshing page
    searchParams.forEach((value, key) => {
      if (value === tag) {
        //removing tag from url
        const SP = new URLSearchParams(tag).toString().slice(0, -1);
        const newStr = searchParams.toString().replace(`${key}=${SP}`, '');
        str = newStr;
      }
    });
    setSearchParams(str);
  };
  return (
    <Wrapper>
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
