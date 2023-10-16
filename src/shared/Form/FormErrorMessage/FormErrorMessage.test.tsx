import { screen } from '@testing-library/react';

import FormErrorMessage from '@shared/Form/FormErrorMessage/FormErrorMessage';
import type { FormErrorMessageProps } from '@shared/Form/FormErrorMessage/FormErrorMessage.types';
import { defaultRender } from '@tests/index';

const props: FormErrorMessageProps = {
  className: 'custom-class',
  children: 'Error message',
};

describe('shared/components/FormErrorMessage', () => {
  it('should renders the expected component', () => {
    defaultRender(<FormErrorMessage {...props} />);

    const errorMessage = screen.getByTestId('FormErrorMessage');

    expect(errorMessage).toHaveClass(`FormErrorMessage ${props.className}`);
    expect(errorMessage).toHaveTextContent(props.children as string);
  });

  it('should not renders the component', () => {
    const localProps: FormErrorMessageProps = {
      ...props,
      children: '',
    };

    defaultRender(<FormErrorMessage {...localProps} />);

    expect(screen.queryByTestId('FormErrorMessage')).not.toBeInTheDocument();
  });
});
