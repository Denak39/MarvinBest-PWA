import BaseErrorPage from '@components/ErrorPage/BaseErrorPage/BaseErrorPage';

function ErrorPage(): JSX.Element {
  return (
    <BaseErrorPage title="Oups...">
      Une erreur est survenue !
      <br /> Contactez un administrateur
      <br /> pour plus d’informations.
    </BaseErrorPage>
  );
}

export default ErrorPage;
