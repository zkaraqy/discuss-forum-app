import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FieldInput from '../../components/FieldInput';
import React from 'react';

/**
 * test scenarios for fieldInput component
 *
 * - FieldInput component
 *   - should render correctly with minimal props
 *   - should render correctly with all props
 *   - should call onClick when the button is clicked
 */

describe('FieldInput component', () => {
  it('should render correctly with minimal props', () => {
    // Arrange
    const props = {
      label: 'Username',
      type: 'text',
      value: '',
      onChange: vi.fn(),
    };

    // Act
    render(<FieldInput {...props} />);

    // Assert
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should render correctly with all props', () => {
    // Arrange
    const props = {
      labelClassName: 'custom-label',
      label: 'Email',
      type: 'email',
      isRequired: true,
      inputClassName: 'custom-input',
      placeholder: 'Enter your email',
      value: 'test@example.com',
      onChange: vi.fn(),
    };

    // Act
    render(<FieldInput {...props} />);

    // Assert
    const labelElement = screen.getByText('Email');
    const inputElement = screen.getByRole('textbox');

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('custom-label');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'email');
    expect(inputElement).toHaveAttribute('required');
    expect(inputElement).toHaveClass('custom-input');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter your email');
    expect(inputElement).toHaveValue('test@example.com');
  });

  it('should call onChange when the input value changes', async () => {
    // Arrange
    const mockOnChange = vi.fn();
    const props = {
      label: 'Username',
      type: 'text',
      value: '',
      onChange: mockOnChange,
    };

    // Act
    render(<FieldInput {...props} />);
    const inputElement = screen.getByRole('textbox');

    // Setup userEvent
    const user = userEvent.setup();

    // Type in the input
    await user.type(inputElement, 'test');

    // Assert
    expect(mockOnChange).toHaveBeenCalled();
  });
});
