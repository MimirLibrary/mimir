import { Story, Meta } from '@storybook/react';
import BookCard, { IBookCardProps } from './index';

export default {
  component: BookCard,
  title: 'BookCard',
} as Meta;

const Template: Story<IBookCardProps> = (args: IBookCardProps) => (
  <BookCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Harry Potter',
};
