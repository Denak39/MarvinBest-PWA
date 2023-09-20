import type { LinkProps } from 'react-router-dom';

export interface CardProps extends LinkProps {
  countSentences: number;
  name: string;
}
