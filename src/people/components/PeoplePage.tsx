import { useCallback, useEffect, useState } from 'react';

import Card from '@components/Card/Card';
import Header from '@components/Header/Header';
import Skeleton from '@components/Skeleton/Skeleton';
import { PATHS } from '@constants/index';
import useOnlineStatus from '@hooks/useOnlineStatus';
import useScrolledToBottom from '@hooks/useScrolledToBottom';
import { useGetPeopleQuery } from '@people/slice';
import type { PeoplePageProps } from '@people/types';

import '@people/styles/PeoplePage.scss';

function PeoplePage({ sentencesFromStorage }: PeoplePageProps): JSX.Element {
  const [page, setPage] = useState<number>(1);

  const isBottom = useScrolledToBottom(100);
  const isOnline = useOnlineStatus();

  const { data: people, isFetching } = useGetPeopleQuery({
    'order[name]': 'asc',
    page,
  });

  const handleUpdatePage = useCallback((): void => {
    if (!people || page >= people.totalPages) return;
    setPage(page + 1);
  }, [page, people]);

  const renderSkeletons = (): JSX.Element[] | null => {
    if (!isFetching && isOnline) return null;

    return Array.from({ length: !isOnline ? 3 : 10 }, (_v, i) => i).map((_item, index) => (
      <Skeleton
        delay={`${index * 0.2}s`}
        height="4.875rem"
        // eslint-disable-next-line react/no-array-index-key
        key={`skeleton-${index}`}
      />
    ));
  };

  useEffect(() => {
    if (!isBottom) return;
    handleUpdatePage();
  }, [handleUpdatePage, isBottom]);

  return (
    <div className="PeoplePage">
      <Header>Personnes</Header>

      <ul className="PeoplePage__list">
        {people?.data.map(({ id, name, countSentences }) => (
          <li className="PeoplePage__item" key={id}>
            <Card
              countSentences={
                countSentences +
                sentencesFromStorage.filter((sentence) => sentence.personId === id).length
              }
              name={name}
              to={`${PATHS.PEOPLE}/${id}`}
            />
          </li>
        ))}

        {renderSkeletons()}
      </ul>
    </div>
  );
}

export default PeoplePage;
