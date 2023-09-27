import clsx from 'clsx';

import type { SelectProps } from '@components/Fields/Select/Select.types';
import IconSmallArrowDown from '@components/Icons/IconSmallArrowDown';

import '@components/Fields/Select/Select.scss';

function Select({ className, ...props }: SelectProps): JSX.Element {
  return (
    <div data-testid="Select" className={clsx('Select', className)}>
      <select data-testid="Select__field" className="Select__field" {...props} />
      <IconSmallArrowDown />
    </div>
  );
}

export default Select;
