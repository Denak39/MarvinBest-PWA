import { render, screen } from '@testing-library/react';

import Textarea from '@components/Fields/Textarea/Textarea';
import type { TextareaProps } from '@components/Fields/Textarea/Textarea.types';

const props: TextareaProps = {
  className: 'custom-class',
  defaultValue: '',
  placeholder: 'Enter text here...',
};

describe('shared/components/Textarea', () => {
  it('should renders the expected component', () => {
    render(<Textarea {...props} />);

    const textarea = screen.getByTestId('Textarea');

    expect(textarea).toHaveClass('Textarea custom-class');
    expect(textarea).toHaveValue(props.defaultValue as string);
    expect(textarea).toHaveAttribute('placeholder', props.placeholder);
  });
});
