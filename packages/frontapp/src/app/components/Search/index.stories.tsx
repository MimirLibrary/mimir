import { Story, Meta } from '@storybook/react';
import Search from './index';

export default {
  component: Search,
  title: 'Search',
} as Meta;

const Template: Story<typeof Search> = () => (
  <Search
    search="search"
    handleChangeSearch={() => console.log('Search')}
    placeholder="search"
  />
);

export const Primary = Template.bind({});
Primary.args = {};
