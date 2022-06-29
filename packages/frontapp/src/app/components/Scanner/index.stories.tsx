import { Story, Meta } from '@storybook/react';
import Scanner, { IScannerProps } from './index';

export default {
  component: Scanner,
  title: 'Scanner',
} as Meta;

const Template: Story<IScannerProps> = (args: IScannerProps) => (
  <Scanner {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  onDetected: (code) => console.log(code),
  onClose: () => console.log('onClose action'),
};
