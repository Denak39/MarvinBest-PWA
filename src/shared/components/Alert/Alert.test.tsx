import { render, screen } from '@testing-library/react';

import Alert from '@components/Alert/Alert';
import type { AlertProps } from '@components/Alert/Alert.types';

const props: AlertProps = {
  children: <p>An error has occurred</p>,
  isVisible: true,
  className: 'custom-class',
};

describe('shared/components/Alert', () => {
  it('should renders the expected component', () => {
    render(<Alert {...props} />);

    const alert = screen.getByTestId('Alert');

    expect(alert).toHaveClass('Alert Alert--is-visible custom-class');
    expect(alert).toHaveTextContent('An error has occurred');
    expect(alert).toBeVisible();
  });

  it('should renders the expected component hidden', () => {
    const localProps: AlertProps = {
      ...props,
      isVisible: false,
    };

    render(<Alert {...localProps} />);

    const alert = screen.getByTestId('Alert');

    expect(alert).not.toHaveClass('Alert--is-visible');
  });
});
