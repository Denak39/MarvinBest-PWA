import BaseErrorPage from '@shared/ErrorPage/BaseErrorPage/BaseErrorPage';

/**
 * Error page.
 *
 * @return {JSX.Element}
 */
function ErrorPage(): JSX.Element {
  return (
    <BaseErrorPage title="Oups..." data-testid="ErrorPage">
      Une erreur est survenue !
      <br /> Contactez un administrateur
      <br /> pour plus d’informations.
    </BaseErrorPage>
  );
}

export default ErrorPage;
