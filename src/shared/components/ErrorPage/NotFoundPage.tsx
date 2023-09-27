import BaseErrorPage from '@components/ErrorPage/BaseErrorPage/BaseErrorPage';

function NotFoundPage(): JSX.Element {
  return (
    <BaseErrorPage title="Erreur 404">
      La page que vous souhaitez
      <br /> afficher n’existe pas ou plus...
    </BaseErrorPage>
  );
}

export default NotFoundPage;
