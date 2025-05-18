import React, { useState } from 'react';
import FieldInput from '../../components/FieldInput';

export default {
  title: 'Components/FieldInput',
  component: FieldInput,
  tags: ['autodocs'],
  argTypes: {
    labelClassName: { control: 'text' },
    label: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'date', 'tel'],
    },
    isRequired: { control: 'boolean' },
    inputClassName: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
  parameters: {
    layout: 'centered',
  },
};

// We need to use a template that manages state for the component
const Template = (args) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <FieldInput
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        args.onChange(e);
      }}
    />
  );
};

// Default text input
export const Text = {
  render: Template,
  args: {
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
    value: '',
  },
};

// Email input
export const Email = {
  render: Template,
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    value: '',
  },
};

// Password input
export const Password = {
  render: Template,
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    value: '',
  },
};

// Required input
export const Required = {
  render: Template,
  args: {
    label: 'Required Field',
    type: 'text',
    isRequired: true,
    placeholder: 'This field is required',
    value: '',
  },
};

// Custom styled input
export const CustomStyled = {
  render: Template,
  args: {
    labelClassName: 'text-xl font-bold text-primary',
    label: 'Custom Styled Input',
    type: 'text',
    inputClassName: 'input input-bordered input-primary',
    placeholder: 'Custom styled input',
    value: '',
  },
};

// Input with initial value
export const WithInitialValue = {
  render: Template,
  args: {
    label: 'Input with initial value',
    type: 'text',
    value: 'Initial value',
  },
};
