import { fireEvent, render, screen } from '@testing-library/react';

import SelectField from '@components/Fields/SelectField/SelectField';
import type { SelectFieldProps } from '@components/Fields/SelectField/SelectField.types';

const props: SelectFieldProps = {
  className: 'custom-class',
};

describe('shared/components/SelectField', () => {
  it('should render the expected component with options', () => {
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];

    render(
      <SelectField {...props}>
        {options.map((option) => (
          <option key={option.value}>{option.label}</option>
        ))}
      </SelectField>
    );

    const selectField = screen.getByTestId('SelectField');
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    const option3 = screen.getByText('Option 3');

    expect(selectField).toHaveClass('SelectField custom-class');

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
      <SelectField {...props}>
        {options.map((option) => (
          <option key={option.value}>{option.label}</option>
        ))}
      </SelectField>
    );

    const selectField = screen.getByTestId('SelectField');

    fireEvent.change(selectField, { target: { value: 'option2' } });

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
