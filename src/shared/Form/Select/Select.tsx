import clsx from 'clsx';

import type { SelectProps } from '@shared/Form/Select/Select.types';
import IconSmallArrowDown from '@shared/Icons/components/IconSmallArrowDown';

/**
 * Select component.
 *
 * @param {SelectProps} props Props
 * @return {JSX.Element}
 */
function Select({ children, className, placeholder, ...props }: SelectProps): JSX.Element {
  return (
    <div className={clsx('Select', className)} data-testid="Select">
      <select data-testid="FieldSelect" {...props}>
        {!!placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {children}
      </select>

      <IconSmallArrowDown />
    </div>
  );
}

export default Select;
