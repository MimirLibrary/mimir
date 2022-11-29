import styled from '@emotion/styled';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Close } from '../../../assets/Close.svg';
import { useTranslation } from 'react-i18next';
import { dimensions } from '@mimir/ui-kit';
import { shortenText } from '../../../helpers/common';

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
    overflow-y: hidden;
    gap: 4px;
    max-width: calc(100vw - ${dimensions.xl_3});
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
}
const Tags: FC<IProps> = ({ chosenTags }) => {
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
      <TagsWrapper>
        {chosenTags.map((tag) => {
          indexes++;
          return (
            <StyledTags key={indexes}>
              <StyledCross onClick={() => onCrossClick(tag)} />
              {shortenText(tag, 15)}
            </StyledTags>
          );
        })}
      </TagsWrapper>
    </Wrapper>
  );
};

export default Tags;
