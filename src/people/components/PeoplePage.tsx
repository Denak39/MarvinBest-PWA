import { useState } from 'react';

import Card from '@components/Card/Card';
import Header from '@components/Header/Header';
import { PATHS } from '@constants/index';
import { useGetPeopleQuery } from '@people/slice';

import '@people/styles/PeoplePage.scss';

function PeoplePage(): JSX.Element {
  const [currentPage] = useState<number>(1);

  const { data: people = [], isLoading } = useGetPeopleQuery({ page: currentPage });

  return (
    <div className="PeoplePage">
      <Header title="Personnes" />

      {!!people.length && (
        <ul className="PeoplePage__list">
          {people.map(({ id, name, countSentences }) => (
            <li className="PeoplePage__item" key={id}>
              <Card countSentences={countSentences} name={name} to={`${PATHS.PEOPLE}/${id}`} />
            </li>
          ))}
        </ul>
      )}

      {/* // TODO: add skeleton loader components. */}
      {isLoading && <p>Chargement en cours...</p>}

      {/* // TODO: add a no result component. */}
      {!people.length && !isLoading && <p>Aucune personnes disponibles...</p>}
    </div>
  );
}

export default PeoplePage;
