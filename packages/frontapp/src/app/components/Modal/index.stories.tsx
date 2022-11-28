import Modal, { IPropsModal } from './index';
import { Story } from '@storybook/react';
import { useState } from 'react';

export default {
  component: Modal,
  title: 'Modal',
};

const Template: Story<IPropsModal> = (args: IPropsModal) => {
  const [active, setActive] = useState(true);
  return (
    <div>
      <Modal active={true} setActive={setActive}>
        <p>Text for example #1</p>
      </Modal>
      <p>Text for example #2</p>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  active: true,
};
