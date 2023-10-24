import clsx from 'clsx';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';

/**
 * IconSpinner component.
 *
 * @return {JSX.Element}
 */
function IconSpinner({ className, ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon className={clsx('Icon--spinner', className)} data-testid="IconSpinner" {...props}>
      <path d="M13.4 6.89999C13.4 6.01839 14.1184 5.29999 15 5.29999C20.3456 5.29999 24.7 9.65439 24.7 15C24.7 20.3456 20.3456 24.7 15 24.7C9.65445 24.7 5.30005 20.3456 5.30005 15C5.30005 13.1866 5.80444 11.4208 6.75518 9.88802L6.76502 9.87216L6.77569 9.85685C7.01059 9.51967 7.36603 9.28561 7.76858 9.20301C8.17112 9.12041 8.59002 9.19559 8.93872 9.41301C9.28742 9.63044 9.53928 9.9735 9.64227 10.3713C9.74526 10.7691 9.69151 11.1913 9.49213 11.5506L9.48399 11.5653L9.47515 11.5796C8.83874 12.6071 8.50109 13.7916 8.50005 15.0003C8.5002 18.5825 11.4177 21.5 15 21.5C18.5824 21.5 21.5 18.5824 21.5 15C21.5 11.4176 18.5824 8.49999 15 8.49999C14.1184 8.49999 13.4 7.78159 13.4 6.89999Z" />
    </BaseIcon>
  );
}

export default IconSpinner;
