import { screen } from '@testing-library/react';

import Skeleton from '@shared/Skeleton/Skeleton';
import type { SkeletonProps } from '@shared/Skeleton/Skeleton.types';
import { defaultRender } from '@tests/index';

const props: SkeletonProps = {
  className: 'custom-class',
  delay: '1s',
  style: { backgroundColor: '#fff' },
};

describe('shared/components/Skeleton', () => {
  it('should renders the expected component', () => {
    defaultRender(<Skeleton {...props} />);

    const skeleton = screen.getByTestId('Skeleton');

    expect(skeleton).toHaveClass(`Skeleton ${props.className}`);
    expect(skeleton).toHaveStyle({
      'animation-delay': props.delay,
      'background-color': props.style?.backgroundColor,
    });
  });
});
