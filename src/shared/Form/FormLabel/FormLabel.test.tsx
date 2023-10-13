import { render, screen } from '@testing-library/react';

import FormLabel from '@shared/Form/FormLabel/FormLabel';
import type { FormLabelProps } from '@shared/Form/FormLabel/FormLabel.types';

const props: FormLabelProps = {
  className: 'custom-class',
  children: 'Label',
};

describe('shared/components/FormLabel', () => {
  it('should renders the expected component', () => {
    render(<FormLabel {...props} />);

    const formLabel = screen.getByTestId('FormLabel');

    expect(formLabel).toHaveClass(`FormLabel ${props.className}`);
    expect(formLabel).toHaveTextContent(props.children as string);
  });
});
