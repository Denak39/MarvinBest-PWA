import clsx from 'clsx';

import type { TextAreaFieldProps } from '@components/Fields/TextAreaField/TextAreaField.types';

import '@components/Fields/TextAreaField/TextAreaField.scss';

function TextAreaField({
  className,
  ...props
}: TextAreaFieldProps): JSX.Element {
  return <textarea className={clsx('TextAreaField', className)} {...props} />;
}

export default TextAreaField;
