import { RadioGroup } from '.';

export default {
  Component: RadioGroup,
  title: 'Radio Button',
};

export const DefaultRadioButton = () => {
  const options = [
    { name: 'YES', value: 'yes' },
    { name: 'NO', value: 'no' },
  ];

  return <RadioGroup name="isHungry" defaultValue="yes" options={options} />;
};
