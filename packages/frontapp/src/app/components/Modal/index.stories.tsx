import Modal, { IPropsModal } from './index';
import { Story } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Modal',
  component: Modal,
};

const Wrapper = (props: any) => {
  const [active, setActive] = useState(true);
  return <Modal active={active} setActive={setActive} {...props} />;
};

const Template: Story<IPropsModal> = (args: IPropsModal) => (
  <Wrapper {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  active: true,
  //setActive: ;
};
