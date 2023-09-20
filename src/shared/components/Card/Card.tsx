import { memo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import Avatar from '@components/Avatar/Avatar';
import type { CardProps } from '@components/Card/Card.types';
import IconArrowForward from '@components/Icons/IconArrowForward';

import '@components/Card/Card.scss';

function Card({ className, countSentences, name, ...props }: CardProps): JSX.Element {
  return (
    <Link className={clsx('Card', className)} data-testid="Card" {...props}>
      <Avatar name={name} />

      <div className="Card__text">
        <p className="Card__name">{name}</p>
        <p className="Card__count-sentences">
          {`${countSentences} phrase${countSentences > 1 ? 's' : ''}`}
        </p>
      </div>

      <IconArrowForward />
    </Link>
  );
}

export default memo(Card);
