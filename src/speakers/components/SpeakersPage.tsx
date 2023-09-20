import Card from '@components/Card/Card';
import Header from '@components/Header/Header';
import { PATHS } from '@constants/index';
import { useGetSpeakersQuery } from '@speakers/slice';

import '@speakers/styles/SpeakersPage.scss';

function SpeakersPage(): JSX.Element {
  const {
    data: speakers = [
      { id: 1, name: 'Quentin Masbernat', countSentences: 2 },
      { id: 2, name: 'Axelle Perchaud', countSentences: 1 },
    ],
  } = useGetSpeakersQuery();

  return (
    <div className="SpeakersPage">
      <Header title="Personnes" />

      {speakers.length ? (
        <ul className="SpeakersPage__list">
          {speakers.map(({ id, name, countSentences }) => (
            <li className="SpeakersPage__item" key={id}>
              <Card countSentences={countSentences} name={name} to={`${PATHS.SPEAKERS}/${id}`} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune personnes disponibles...</p>
      )}
    </div>
  );
}

export default SpeakersPage;
