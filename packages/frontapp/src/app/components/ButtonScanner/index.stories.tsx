import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonScanner from './index';
import { dimensions } from '@mimir/ui-kit';

export default {
  component: ButtonScanner,
  title: 'ButtonScanner',
} as ComponentMeta<typeof ButtonScanner>;

const Template: ComponentStory<typeof ButtonScanner> = (args) => (
  <ButtonScanner {...args} />
);

export const Default = Template.bind({});
export const Small = Template.bind({});
Default.args = {
  width: `${dimensions.xl_6}`,
  height: `${dimensions.xl_6}`,
};
Small.args = {
  width: `${dimensions.xl_4}`,
  height: `${dimensions.xl_4}`,
};
