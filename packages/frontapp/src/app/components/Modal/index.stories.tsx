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
      <div id="modal"></div>
      <Modal active={active} setActive={setActive}>
        <p>Text for example</p>
      </Modal>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  active: true,
};
