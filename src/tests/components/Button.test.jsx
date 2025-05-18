import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../components/Button';
import React from 'react';

describe('Button component', () => {
  it('should render correctly with minimal props', () => {
    // Arrange
    const props = {
      children: 'Click me',
    };

    // Act
    render(<Button {...props} />);

    // Assert
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should render correctly with all props', () => {
    // Arrange
    const props = {
      id: 'test-button',
      type: 'submit',
      className: 'btn-primary',
      onClick: vi.fn(),
      children: 'Submit',
      disabled: true,
    };

    // Act
    render(<Button {...props} />);

    // Assert
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn btn-primary');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('id', 'test-button');
  });

  it('should call onClick when the button is clicked', async () => {
    // Arrange
    const mockOnClick = vi.fn();
    const props = {
      children: 'Click me',
      onClick: mockOnClick,
    };

    // Act
    render(<Button {...props} />);

    // Setup userEvent
    const user = userEvent.setup();

    // Click the button
    await user.click(screen.getByRole('button', { name: 'Click me' }));

    // Assert
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when the button is disabled', async () => {
    // Arrange
    const mockOnClick = vi.fn();
    const props = {
      children: 'Click me',
      onClick: mockOnClick,
      disabled: true,
    };

    // Act
    render(<Button {...props} />);

    // Setup userEvent
    const user = userEvent.setup();

    // Try to click the disabled button
    await user.click(screen.getByRole('button', { name: 'Click me' }));

    // Assert
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
