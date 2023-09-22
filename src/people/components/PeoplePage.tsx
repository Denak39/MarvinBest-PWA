import Card from '@components/Card/Card';
import Header from '@components/Header/Header';
import { PATHS } from '@constants/index';
import { useGetPeopleQuery } from '@people/slice';

import '@people/styles/PeoplePage.scss';

function PeoplePage(): JSX.Element {
  const {
    data: people = [
      { id: 1, name: 'Quentin Masbernat', countSentences: 2 },
      { id: 2, name: 'Axelle Perchaud', countSentences: 1 },
    ],
  } = useGetPeopleQuery();

  return (
    <div className="PeoplePage">
      <Header title="Personnes" />

      {people.length ? (
        <ul className="PeoplePage__list">
          {people.map(({ id, name, countSentences }) => (
            <li className="PeoplePage__item" key={id}>
              <Card countSentences={countSentences} name={name} to={`${PATHS.PEOPLE}/${id}`} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune personnes disponibles...</p>
      )}
    </div>
  );
}

export default PeoplePage;
