import Message from '@components/Message/Message';
import { useGetLastSentenceQuery } from '@sentences/slice';

import logo from '@images/logo.svg';

import '@home/styles/HomePage.scss';

function HomePage(): JSX.Element {
  // TODO: use selector instead of useGetLastSentenceQuery.
  const { data: lastSentence } = useGetLastSentenceQuery();

  return (
    <div className="HomePage">
      <img alt="Logo marvin.best" className="HomePage__logo" src={logo} draggable={false} />

      {!!lastSentence && (
        <>
          <h1 className="HomePage__title">Dernière phrase ajoutée</h1>
          <Message name={lastSentence.speaker.name} date={lastSentence.createdAt}>
            {lastSentence.message}
          </Message>
        </>
      )}
    </div>
  );
}

export default HomePage;
