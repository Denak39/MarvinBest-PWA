import { screen } from '@testing-library/react';

import FormControl from '@shared/Form/FormControl/FormControl';
import type { FormControlProps } from '@shared/Form/FormControl/FormControl.types';
import { defaultRender } from '@tests/index';

const props: FormControlProps = {
  className: 'custom-class',
  children: 'Text',
};

describe('shared/components/FormControl', () => {
  it('should renders the expected component', () => {
    defaultRender(<FormControl {...props} />);

    const formControl = screen.getByTestId('FormControl');

    expect(formControl).toHaveClass(`FormControl ${props.className}`);
    expect(formControl).toHaveTextContent(props.children as string);
  });
});
