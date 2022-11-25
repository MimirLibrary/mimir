import { useState } from 'react';
import LabeledCheckbox from '.';

export default {
  Component: LabeledCheckbox,
  title: 'Labeled Checkbox',
};

export const Checked = () => {
  const [checked, setIsChecked] = useState(true);

  return (
    <LabeledCheckbox
      id="1"
      checked={checked}
      onChange={() => setIsChecked((prev) => !prev)}
      name="example"
      value="example"
    />
  );
};

export const Disabled = () => {
  const [checked, setIsChecked] = useState(false);

  return (
    <LabeledCheckbox
      id="1"
      checked={checked}
      disabled
      onChange={() => setIsChecked((prev) => !prev)}
      name="example"
      value="example"
    />
  );
};
