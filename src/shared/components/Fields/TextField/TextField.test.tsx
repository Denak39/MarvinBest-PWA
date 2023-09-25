import { render, screen } from '@testing-library/react';

import TextField from '@components/Fields/TextField/TextField';
import type { TextFieldProps } from '@components/Fields/TextField/TextField.types';

const props: TextFieldProps = {
  className: 'custom-class',
  value: '',
  placeholder: 'Enter text here...',
};

describe('shared/components/TextField', () => {
  it('should renders the expected component', () => {
    render(<TextField {...props} />);

    const textField = screen.getByTestId('TextField');

    expect(textField).toHaveClass('TextField custom-class');
    expect(textField).toHaveValue(props.value as string);
    expect(textField).toHaveAttribute('placeholder', props.placeholder);
  });
});
