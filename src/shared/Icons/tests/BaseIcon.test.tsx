import { screen } from '@testing-library/react';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';
import { defaultRender } from '@tests/index';

const props: BaseIconProps = {
  className: 'custom-class',
  children: 'Path icon',
  title: 'Title',
};

describe('shared/components/BaseIcon', () => {
  it('should renders the expected component', () => {
    defaultRender(<BaseIcon {...props} />);

    const baseIcon = screen.getByTestId('BaseIcon');
    const svg = baseIcon.querySelector('svg');
    const path = screen.getByText(props.children as string);

    expect(baseIcon).toHaveClass(`Icon ${props.className}`);
    expect(baseIcon).toHaveAccessibleDescription(props.title);
    expect(baseIcon).toHaveAttribute('aria-hidden');
    expect(svg).toHaveAttribute('viewBox', '0 0 30 30');
    expect(svg).toHaveAttribute('fill', 'currentColor');
    expect(svg).toContainElement(path);
  });
});
