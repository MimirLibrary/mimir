import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loader from './index';

export default {
  component: Loader,
  title: 'Loader',
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});

Primary.args = {
  color: 'blue',
  height: 100,
  width: 100,
  strokeWidth: 5,
};

Secondary.args = {
  color: 'blue',
  height: 200,
  width: 200,
  strokeWidth: 10,
};
