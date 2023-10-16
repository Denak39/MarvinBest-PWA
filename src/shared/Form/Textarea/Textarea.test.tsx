import { screen } from '@testing-library/react';

import Textarea from '@shared/Form/Textarea/Textarea';
import type { TextareaProps } from '@shared/Form/Textarea/Textarea.types';
import { defaultRender } from '@tests/index';

const props: TextareaProps = {
  className: 'custom-class',
  defaultValue: '',
  placeholder: 'Enter text here...',
};

describe('shared/components/Textarea', () => {
  it('should renders the expected component', () => {
    defaultRender(<Textarea {...props} />);

    const textarea = screen.getByTestId('Textarea');

    expect(textarea).toHaveClass(`Textarea ${props.className}`);
    expect(textarea).toHaveValue(props.defaultValue as string);
    expect(textarea).toHaveAttribute('placeholder', props.placeholder);
  });
});
