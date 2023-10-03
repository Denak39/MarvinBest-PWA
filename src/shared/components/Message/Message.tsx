import { memo } from 'react';
import clsx from 'clsx';

import Avatar from '@components/Avatar/Avatar';
import IconSpinner from '@components/Icons/IconSpinner';
import type { MessageProps } from '@components/Message/Message.types';
import DateHelpers from '@helpers/DateHelpers';

import '@components/Message/Message.scss';

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
