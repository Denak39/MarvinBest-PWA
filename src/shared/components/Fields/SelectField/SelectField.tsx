import clsx from 'clsx';

import type { SelectFieldProps } from '@components/Fields/SelectField/SelectField.types';
import IconSmallArrowDown from '@components/Icons/IconSmallArrowDown';

import '@components/Fields/SelectField/SelectField.scss';

function SelectField({ className, ...props }: SelectFieldProps): JSX.Element {
  return (
    <div className={clsx('SelectFieldWrapper', className)} data-testid="SelectField">
      <select className="SelectFieldWrapper__field" {...props} />
      <IconSmallArrowDown />
    </div>
  );
}

export default SelectField;
