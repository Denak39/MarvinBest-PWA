import { screen } from '@testing-library/react';

import TextField from '@shared/Form/TextField/TextField';
import type { TextFieldProps } from '@shared/Form/TextField/TextField.types';
import { defaultRender } from '@tests/index';

const props: TextFieldProps = {
  className: 'custom-class',
  defaultValue: '',
  placeholder: 'Enter text here...',
};

describe('shared/components/TextField', () => {
  it('should renders the expected component', () => {
    defaultRender(<TextField {...props} />);

    const textField = screen.getByTestId('TextField');

    expect(textField).toHaveClass(`TextField ${props.className}`);
    expect(textField).toHaveValue(props.defaultValue as string);
    expect(textField).toHaveAttribute('placeholder', props.placeholder);
  });
});
