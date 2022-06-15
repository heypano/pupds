import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Blutton } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Blutton sample story',
  component: Blutton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Blutton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Blutton> = (args) => <Blutton {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary',
};
