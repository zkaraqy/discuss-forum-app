import React from 'react';
import Button from '../../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    className: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
};

// Default button
export const Default = {
  args: {
    children: 'Button',
    className: 'btn', // Add base class explicitly
  },
};

// Primary Button
export const Primary = {
  args: {
    children: 'Primary Button',
    className: 'btn btn-primary',
  },
};

// Secondary Button
export const Secondary = {
  args: {
    children: 'Secondary Button',
    className: 'btn btn-secondary',
  },
};

// Success Button
export const Success = {
  args: {
    children: 'Success Button',
    className: 'btn btn-success',
  },
};

// Error Button
export const Error = {
  args: {
    children: 'Error Button',
    className: 'btn btn-error',
  },
};

// Disabled Button
export const Disabled = {
  args: {
    children: 'Disabled Button',
    className: 'btn', // Add base class explicitly
    disabled: true,
  },
};

// Submit Button
export const Submit = {
  args: {
    children: 'Submit',
    type: 'submit',
    className: 'btn btn-primary',
  },
};

// Large Button
export const Large = {
  args: {
    children: 'Large Button',
    className: 'btn btn-lg btn-primary',
  },
};

// Small Button
export const Small = {
  args: {
    children: 'Small Button',
    className: 'btn btn-sm btn-primary',
  },
};
