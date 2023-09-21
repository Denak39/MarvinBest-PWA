import { render, screen } from '@testing-library/react';

import Avatar from '@components/Avatar/Avatar';
import type { AvatarProps } from '@components/Avatar/Avatar.types';

const props: AvatarProps = {
  className: 'custom-class',
  initial: 'MQ',
};

describe('shared/components/Avatar', () => {
  it('should renders the expected component', () => {
    render(<Avatar {...props} />);

    const avatar = screen.getByTestId('Avatar');

    expect(avatar).toHaveClass('Avatar custom-class');
    expect(avatar).toHaveTextContent(props.initial);
  });
});
