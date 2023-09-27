import { fireEvent, render, screen } from '@testing-library/react';

import Select from '@components/Fields/Select/Select';
import type { SelectProps } from '@components/Fields/Select/Select.types';

const props: SelectProps = {
  className: 'custom-class',
};

describe('shared/components/Select', () => {
  it('should render the expected component with options', () => {
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];

    render(
      <Select {...props}>
        {options.map((option) => (
          <option key={option.value}>{option.label}</option>
        ))}
      </Select>
    );

    const select = screen.getByTestId('Select');
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    const option3 = screen.getByText('Option 3');

    expect(select).toHaveClass('Select custom-class');

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  it('should handle user selection', () => {
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];

    render(
      <Select {...props}>
        {options.map((option) => (
          <option key={option.value}>{option.label}</option>
        ))}
      </Select>
    );

    const select = screen.getByTestId('Select__field');

    fireEvent.change(select, { target: { value: 'option2' } });

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
