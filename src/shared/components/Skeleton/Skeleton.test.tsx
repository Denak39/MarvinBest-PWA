import { render, screen } from '@testing-library/react';

import Skeleton from '@components/Skeleton/Skeleton';
import type { SkeletonProps } from '@components/Skeleton/Skeleton.types';

const props: SkeletonProps = {
  className: 'custom-class',
  delay: '1s',
  height: '50px',
  style: { backgroundColor: '#fff' },
  width: '100px',
};

describe('shared/components/Skeleton', () => {
  it('should renders the expected component', () => {
    render(<Skeleton {...props} />);

    const skeleton = screen.getByTestId('Skeleton');

    expect(skeleton).toHaveClass('Skeleton custom-class');
    expect(skeleton).toHaveStyle({
      'animation-delay': props.delay,
      'background-color': props.style?.backgroundColor,
      height: props.height,
      width: props.width,
    });
  });
});
