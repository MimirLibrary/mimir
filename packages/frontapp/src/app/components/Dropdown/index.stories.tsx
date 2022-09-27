import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from './index';

export default {
  component: Dropdown,
  title: 'Dropdown',
  argTypes: { onChange: { action: 'Selected' } },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Primary = Template.bind({});
export const WithInitIndex = Template.bind({});
export const WithValue = Template.bind({});
Primary.args = {
  placeholder: 'Simple text',
  options: [
    { value: 'Option One' },
    { value: 'Option Two' },
    { value: 'Option Three' },
    { value: 'Option Four' },
    { value: 'Option Five' },
    { value: 'Option Six' },
    { value: 'Option Seven' },
    { value: 'Option Eight' },
    { value: 'Option Nine' },
  ],
};
WithInitIndex.args = {
  placeholder: 'Simple text',
  options: [{ value: 'Option One' }, { value: 'Option Two' }],
  initIndex: 1,
};
WithValue.args = {
  placeholder: 'Simple text',
  options: [{ value: 'Option One' }, { value: 'Option Two' }],
  value: 'Option Two',
};
