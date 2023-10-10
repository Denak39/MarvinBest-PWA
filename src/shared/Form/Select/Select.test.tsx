import { render, screen } from '@testing-library/react';

import Select from '@shared/Form/Select/Select';
import type { SelectProps } from '@shared/Form/Select/Select.types';

const props: SelectProps = {
  className: 'custom-class',
  children: (
    <>
      <option value="option-1">Option 1</option>
      <option value="option-2">Option 2</option>
      <option value="option-3">Option 3</option>
    </>
  ),
  required: true,
};

describe('shared/components/Select', () => {
  it('should render the expected component', () => {
    render(<Select {...props} />);

    const selectContainer = screen.getByTestId('Select');
    const select = selectContainer.querySelector('select');
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    const option3 = screen.getByText('Option 3');

    expect(selectContainer).toHaveClass(`Select ${props.className}`);
    expect(select).toBeRequired();

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  it('should render the expected component with placeholder', () => {
    const localProps: SelectProps = {
      ...props,
      placeholder: 'Placeholder',
    };

    render(<Select {...localProps} />);

    const optionPlaceholder = screen.getByText(localProps.placeholder as string);

    expect(optionPlaceholder).toBeInTheDocument();
  });
});
