import clsx from 'clsx';

import type { SelectFieldProps } from '@components/Fields/SelectField/SelectField.types';

import '@components/Fields/SelectField/SelectField.scss';

function SelectField({ className, ...props }: SelectFieldProps): JSX.Element {
  return <select className={clsx('SelectField', className)} {...props} />;
}

export default SelectField;
