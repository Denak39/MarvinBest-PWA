import clsx from 'clsx';

import type { TextareaProps } from '@shared/Form/Textarea/Textarea.types';

/**
 * Textarea component.
 *
 * @param {TextareaProps} props Props
 * @return {JSX.Element}
 */
function Textarea({ className, ...props }: TextareaProps): JSX.Element {
  return <textarea className={clsx('Textarea', className)} data-testid="Textarea" {...props} />;
}

export default Textarea;
