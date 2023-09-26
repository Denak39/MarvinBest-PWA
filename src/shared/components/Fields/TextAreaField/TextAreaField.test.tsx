import { render, screen } from '@testing-library/react';

import TextAreaField from '@components/Fields/TextAreaField/TextAreaField';
import type { TextAreaFieldProps } from '@components/Fields/TextAreaField/TextAreaField.types';

const props: TextAreaFieldProps = {
  className: 'custom-class',
  defaultValue: '',
  placeholder: 'Enter text here...',
};

describe('shared/components/TextAreaField', () => {
  it('should renders the expected component', () => {
    render(<TextAreaField {...props} />);

    const textAreaField = screen.getByTestId('TextAreaField');

    expect(textAreaField).toHaveClass('TextAreaField custom-class');
    expect(textAreaField).toHaveValue(props.defaultValue as string);
    expect(textAreaField).toHaveAttribute('placeholder', props.placeholder);
  });
});
