import Modal, { IPropsModal } from './index';
import { Story } from '@storybook/react';

export default {
  title: 'Modal',
  component: Modal,
};

const Template: Story<IPropsModal> = (args: IPropsModal) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  active: true,
  //setActive: ;
};
