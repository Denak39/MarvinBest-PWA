import { screen } from '@testing-library/react';

import Alert from '@shared/Alert/Alert';
import type { AlertProps } from '@shared/Alert/Alert.types';
import { defaultRender } from '@tests/index';

const props: AlertProps = {
  children: <p>An error has occurred</p>,
  isVisible: true,
  className: 'custom-class',
};

describe('shared/components/Alert', () => {
  it('should renders the expected component', () => {
    defaultRender(<Alert {...props} />);

    const alert = screen.getByTestId('Alert');

    expect(alert).toHaveClass(`Alert Alert--is-visible ${props.className}`);
    expect(alert).toHaveTextContent('An error has occurred');
    expect(alert).toBeVisible();
  });

  it('should renders the expected component hidden', () => {
    const localProps: AlertProps = {
      ...props,
      isVisible: false,
    };

    defaultRender(<Alert {...localProps} />);

    const alert = screen.getByTestId('Alert');

    expect(alert).not.toHaveClass('Alert--is-visible');
    expect(alert).not.toBeVisible();
  });
});
