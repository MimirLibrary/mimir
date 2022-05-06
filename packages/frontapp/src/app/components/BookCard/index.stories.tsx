import { Story, Meta } from '@storybook/react';
import BookCard, { IProps } from './index';

export default {
  component: BookCard,
  title: 'BookCard',
} as Meta;

const Template: Story<IProps> = (args: IProps) => <BookCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  description: 'Fantasy',
  title: 'Harry Potter',
};
