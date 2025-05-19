import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../../components/Select';
import React from 'react';

/**
 * test scenarios for select component
 *
 * - Select component
 *   - should render correctly with minimal props
 *   - should render correctly with object options
 *   - should render correctly with custom props
 *   - should not show default option when showDefaultOption is false
 *   - should call onChange when a different option is selected
 */

describe('Select component', () => {
  it('should render correctly with minimal props', () => {
    // Arrange
    const props = {
      options: ['Option 1', 'Option 2', 'Option 3'],
      onChange: vi.fn(),
    };

    // Act
    render(<Select {...props} />);

    // Assert
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveClass('select');

    // Check options
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4); // 3 options + default option
    expect(options[0]).toHaveTextContent('Semua Pilih opsi');
    expect(options[1]).toHaveTextContent('Option 1');
    expect(options[2]).toHaveTextContent('Option 2');
    expect(options[3]).toHaveTextContent('Option 3');
  });

  it('should render correctly with object options', () => {
    // Arrange
    const props = {
      options: [
        { value: 'value1', label: 'Label 1' },
        { value: 'value2', label: 'Label 2' },
      ],
      onChange: vi.fn(),
    };

    // Act
    render(<Select {...props} />);

    // Assert
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3); // 2 options + default option
    expect(options[1]).toHaveTextContent('Label 1');
    expect(options[1]).toHaveValue('value1');
    expect(options[2]).toHaveTextContent('Label 2');
    expect(options[2]).toHaveValue('value2');
  });

  it('should render correctly with custom props', () => {
    // Arrange
    const props = {
      value: 'value2',
      onChange: vi.fn(),
      className: 'custom-select',
      options: [
        { value: 'value1', label: 'Label 1' },
        { value: 'value2', label: 'Label 2' },
      ],
      placeholder: 'Custom placeholder',
      defaultOption: { value: '', label: 'All' },
    };

    // Act
    render(<Select {...props} />);

    // Assert
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveClass('custom-select');
    expect(selectElement).toHaveValue('value2');

    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveTextContent('All Custom placeholder');
  });

  it('should not show default option when showDefaultOption is false', () => {
    // Arrange
    const props = {
      options: ['Option 1', 'Option 2'],
      onChange: vi.fn(),
      showDefaultOption: false,
    };

    // Act
    render(<Select {...props} />);

    // Assert
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2); // Only the provided options, no default
    expect(options[0]).toHaveTextContent('Option 1');
    expect(options[1]).toHaveTextContent('Option 2');
  });

  it('should call onChange when a different option is selected', async () => {
    // Arrange
    const mockOnChange = vi.fn();
    const props = {
      options: ['Option 1', 'Option 2', 'Option 3'],
      onChange: mockOnChange,
    };

    // Act
    render(<Select {...props} />);

    // Setup userEvent
    const user = userEvent.setup();

    // Select a different option
    const selectElement = screen.getByRole('combobox');
    await user.selectOptions(selectElement, 'Option 2');

    // Assert
    expect(mockOnChange).toHaveBeenCalled();
  });
});
