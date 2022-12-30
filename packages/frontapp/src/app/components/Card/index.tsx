import { DetailedHTMLProps, FC, ImgHTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

interface CardProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 24px 16px;
  box-shadow: 0px -4px 64px rgba(24, 39, 75, 0.12);
  border-radius: 8px;
`;

const CardImageContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 200px;
  overflow: hidden;
`;

const CardImg: FC<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = (props) => {
  return (
    <CardImageContainer>
      <img {...props} />
    </CardImageContainer>
  );
};

const CardTitle = styled.div`
  margin-top: 16px;
  font-weight: 700;
  font-size: ${dimensions.xl};
  line-height: 25px;
  color: ${colors.main_black};
  text-align: center;
`;

const CardBody = styled.div`
  margin-top: 16px;
`;
const CardFooter = styled.div`
  margin-top: 16px;
`;

const Card: FC<CardProps> = ({ children }) => <Container>{children}</Container>;

export default Object.assign(Card, {
  Img: CardImg,
  Title: CardTitle,
  Body: CardBody,
  Footer: CardFooter,
});
