import { useCallback, useEffect, useState } from 'react';

import Card from '@components/Card/Card';
import Header from '@components/Header/Header';
import { PATHS } from '@constants/index';
import useScrolledToBottom from '@hooks/useScrolledToBottom';
import { useGetPeopleQuery } from '@people/slice';
import type { PeoplePageProps } from '@people/types';

import '@people/styles/PeoplePage.scss';

function PeoplePage({ sentencesFromStorage }: PeoplePageProps): JSX.Element {
  const [page, setPage] = useState<number>(1);

  const isBottom = useScrolledToBottom(100);

  const { data: people, isFetching } = useGetPeopleQuery({
    'order[name]': 'asc',
    page,
  });

  const handleUpdatePage = useCallback((): void => {
    if (!people || page >= people.totalPages) return;
    setPage(page + 1);
  }, [page, people]);

  useEffect(() => {
    if (!isBottom) return;
    handleUpdatePage();
  }, [handleUpdatePage, isBottom]);

  return (
    <div className="PeoplePage">
      <Header title="Personnes" />

      {!!people?.data.length && (
        <ul className="PeoplePage__list">
          {people.data.map(({ id, name, countSentences }) => (
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
        </ul>
      )}

      {/* TODO: add skeleton loader components. */}
      {isFetching && <p>Chargement en cours...</p>}

      {/* TODO: add a no result component. */}
      {!people?.data.length && !isFetching && <p>Aucune personnes disponibles...</p>}
    </div>
  );
}

export default PeoplePage;
