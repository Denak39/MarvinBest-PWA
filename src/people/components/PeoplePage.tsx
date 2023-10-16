import { useCallback, useContext, useEffect, useState } from 'react';

import type { CollectionResponse } from '@api/types';
import { PATHS } from '@constants/index';
import useScrolledToBottom from '@hooks/useScrolledToBottom';
import { useGetPeopleQuery } from '@people/slice';
import type { People } from '@people/types';
import { SentenceIndexedDBContext } from '@sentences/context';
import Card from '@shared/Card/Card';
import Header from '@shared/Header/Header';
import Skeleton from '@shared/Skeleton/Skeleton';

/**
 * People page.
 *
 * @return {JSX.Element}
 */
function PeoplePage(): JSX.Element {
  const { data: sentencesFromStorage } = useContext(SentenceIndexedDBContext);

  const [page, setPage] = useState<number>(1);
  const [peopleList, setPeopleList] = useState<CollectionResponse<People> | undefined>(undefined);

  const isBottom = useScrolledToBottom(100);

  const { data: people, isFetching, isLoading } = useGetPeopleQuery({ page });

  /**
   * Update page.
   *
   * @return {void}
   */
  const handleUpdatePage = useCallback((): void => {
    if (!peopleList || page >= peopleList.totalPages) return;
    setPage(page + 1);
  }, [page, peopleList]);

  /**
   * Render card skeletons.
   *
   * @return {JSX.Element[]|null}
   */
  const renderSkeletons = (): JSX.Element[] | null => {
    if (!isFetching) return null;

    return Array.from({ length: isLoading ? 10 : 3 }, (_v, i) => i).map((_item, index) => (
      <Skeleton
        aria-label="Chargement des personnes"
        className="Skeleton--card"
        delay={`${index * 0.2}s`}
        key={`skeleton-${index}`}
      />
    ));
  };

  useEffect(() => {
    if (!isBottom) return;
    handleUpdatePage();
  }, [handleUpdatePage, isBottom]);

  useEffect(() => {
    if (!people || people.data.slice(-1)[0].id === peopleList?.data.slice(-1)[0].id) return;

    // Merge data.
    setPeopleList({
      totalPages: people.totalPages,
      data: [...(peopleList?.data ?? []), ...people.data],
    });
  }, [people, peopleList]);

  return (
    <div className="PeoplePage">
      <Header>Personnes</Header>

      <ul className="PeoplePage__list">
        {peopleList?.data.map(({ id, name, countSentences }) => {
          const count =
            countSentences +
            sentencesFromStorage.filter((sentence) => parseInt(sentence.personId, 10) === id)
              .length;

          return (
            <li className="PeoplePage__item" key={id}>
              <Card countSentences={count} name={name} to={`${PATHS.PEOPLE}/${id}`} />
            </li>
          );
        })}

        {renderSkeletons()}
      </ul>
    </div>
  );
}

export default PeoplePage;
