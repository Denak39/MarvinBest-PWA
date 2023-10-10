import { render, screen } from '@testing-library/react';

import Avatar from '@shared/Avatar/Avatar';
import type { AvatarProps } from '@shared/Avatar/Avatar.types';

const props: AvatarProps = {
  className: 'custom-class',
  name: 'John Doe',
};

describe('shared/components/Avatar', () => {
  it('should renders the expected component', () => {
    render(<Avatar {...props} />);

    const avatar = screen.getByTestId('Avatar');

    expect(avatar).toHaveClass(`Avatar ${props.className}`);
    expect(avatar).toHaveTextContent('JD');
    expect(avatar).toHaveAccessibleDescription('John Doe');
  });
});
