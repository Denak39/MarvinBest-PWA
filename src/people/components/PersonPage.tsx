import { useParams } from 'react-router-dom';

import Header from '@components/Header/Header';
import Message from '@components/Message/Message';
import { useGetPersonQuery } from '@people/slice';

import '@people/styles/PersonPage.scss';

function PersonPage(): JSX.Element {
  const { id } = useParams();

  const { data: person, isFetching } = useGetPersonQuery(parseInt(String(id), 10));

  return (
    <div className="PersonPage">
      {/* // TODO: add title skeleton loader components. */}
      <Header title={person?.name || ''} goBack />

      {!!person?.sentences.length && (
        <ul className="PersonPage__list">
          {person.sentences.map((sentence) => (
            <li key={sentence.id}>
              <Message name={person.name} date={sentence.createdAt}>
                {sentence.message}
              </Message>
            </li>
          ))}
        </ul>
      )}

      {/* // TODO: add skeleton loader components. */}
      {isFetching && <p>Chargement en cours...</p>}

      {/* // TODO: add a no result component. */}
      {!person?.sentences.length && !isFetching && <p>Aucune phrases disponibles...</p>}
    </div>
  );
}

export default PersonPage;
