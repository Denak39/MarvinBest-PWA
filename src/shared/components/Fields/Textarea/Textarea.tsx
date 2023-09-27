import clsx from 'clsx';

import type { TextareaProps } from '@components/Fields/Textarea/Textarea.types';

import '@components/Fields/Textarea/Textarea.scss';

function Textarea({ className, ...props }: TextareaProps): JSX.Element {
  return <textarea className={clsx('Textarea', className)} data-testid="Textarea" {...props} />;
}

export default Textarea;
