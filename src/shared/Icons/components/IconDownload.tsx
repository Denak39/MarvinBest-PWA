import clsx from 'clsx';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';

/**
 * IconDownload component.
 *
 * @return {JSX.Element}
 */
function IconDownload({ className, ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon className={clsx('Icon--download', className)} data-testid="IconDownload" {...props}>
      <path
        clipRule="evenodd"
        d="m13.535 14.669-2.783-2.783a1.464 1.464 0 0 0-2.074 0 1.464 1.464 0 0 0 0 2.074l5.285 5.285c.574.574 1.5.574 2.074 0l5.285-5.285c.575-.574.575-1.5 0-2.074a1.464 1.464 0 0 0-2.074 0l-2.783 2.783V7.08a1.465 1.465 0 0 0-2.93 0v7.588Zm-8.203 2.68a1.465 1.465 0 0 1 2.93 0v3.37c0 .404.328.732.732.732h12.012a.733.733 0 0 0 .732-.732v-3.37a1.465 1.465 0 0 1 2.93 0v4.102a2.93 2.93 0 0 1-2.93 2.93H8.262a2.93 2.93 0 0 1-2.93-2.93V17.35Z"
        fillRule="evenodd"
      />
    </BaseIcon>
  );
}

export default IconDownload;
