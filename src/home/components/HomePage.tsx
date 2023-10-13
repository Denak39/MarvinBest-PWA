import { useGetLastSentenceQuery } from '@sentences/slice';
import Message from '@shared/Message/Message';

import logo from '@assets/logo.svg';

/**
 * Home page.
 *
 * @return {JSX.Element}
 */
function HomePage(): JSX.Element {
  const { data: lastSentence } = useGetLastSentenceQuery();

  return (
    <div className="HomePage">
      <h1 className="HomePage__logo">
        <img alt="Logo marvin.best" src={logo} draggable={false} />
      </h1>

      {!!lastSentence && (
        <>
          <h2 className="HomePage__title">Dernière phrase ajoutée</h2>
          <Message name={lastSentence.speaker.name} date={lastSentence.createdAt}>
            {lastSentence.message}
          </Message>
        </>
      )}
    </div>
  );
}

export default HomePage;
