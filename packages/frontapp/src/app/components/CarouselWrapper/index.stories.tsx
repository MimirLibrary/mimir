import styled from '@emotion/styled';
import { Story, Meta } from '@storybook/react';
import { SwiperSlide } from 'swiper/react';
import CarouselWrapper, { ICarouselWrapperProps } from './index';

export default {
  component: CarouselWrapper,
  title: 'Carousel',
} as Meta;
const slides = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Card = styled.div`
  width: 150px;
  height: 200px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Template: Story<ICarouselWrapperProps> = (args) => (
  <CarouselWrapper
    {...args}
    slidesListLengt={slides.length}
    slides={SlidesList}
  />
);

const SlidesList = slides.map((slide) => (
  <SwiperSlide>
    <Card>{slide}</Card>
  </SwiperSlide>
));

export const Base = Template.bind({});
Base.args = {
  header: 'This is carousel title',
};
