import { render, screen } from '@testing-library/react';

import Avatar from '@components/Avatar/Avatar';
import type { AvatarProps } from '@components/Avatar/Avatar.types';

describe('shared/components/Avatar', () => {
  it('should renders the expected component', () => {
    const localProps: AvatarProps = {
      className: 'custom-class',
      initial: 'MQ',
    };

    render(<Avatar {...localProps} />);

    const avatar = screen.getByTestId('Avatar');

    expect(avatar).toHaveClass('Avatar custom-class');
    expect(avatar).toHaveTextContent(localProps.initial);
  });
});
