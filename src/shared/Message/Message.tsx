import { memo } from 'react';
import clsx from 'clsx';

import DateHelpers from '@helpers/DateHelpers';
import Avatar from '@shared/Avatar/Avatar';
import IconSpinner from '@shared/Icons/IconSpinner';
import type { MessageProps } from '@shared/Message/Message.types';

/**
 * Message component.
 *
 * @param {MessageProps} props Props
 * @return {JSX.Element}
 */
function Message({
  children,
  className,
  date = '',
  isWaiting = false,
  name,
  ...props
}: MessageProps): JSX.Element {
  const dateTime = new DateHelpers(date);

  return (
    <div className={clsx('Message', className)} data-testid="Message" {...props}>
      <Avatar name={name} className="Message__Avatar" />

      <span className="Message__content">
        <p className="Message__text">{children}</p>

        {isWaiting && (
          <span
            className="Message__waiting"
            title="Le message sera envoyé lorsque que la connexion sera revenue."
          >
            <p>En attente</p>
            <IconSpinner />
          </span>
        )}

        {!!dateTime.toJSON() && !isWaiting && (
          <time
            className="Message__date"
            dateTime={dateTime.getLocaleString()}
            title={dateTime.getFulldate()}
          >
            {dateTime.getShortdate()}
          </time>
        )}
      </span>
    </div>
  );
}

export default memo(Message);
