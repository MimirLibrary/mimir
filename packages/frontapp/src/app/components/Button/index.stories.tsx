import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './index';
import { ReactComponent as SvgNoNotification } from '../../../assets/NoNotification.svg';

export default {
  component: Button,
  title: 'Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
export const WithIcon = Template.bind({});
Primary.args = {
  value: 'Simple Text',
  transparent: false,
};
WithIcon.args = {
  value: 'Simple Text',
  transparent: false,
  svgComponent: <SvgNoNotification />,
};
