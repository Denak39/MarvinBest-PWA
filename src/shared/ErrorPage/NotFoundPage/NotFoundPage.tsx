import BaseErrorPage from '@shared/ErrorPage/BaseErrorPage/BaseErrorPage';

/**
 * NotFound page.
 *
 * @return {JSX.Element}
 */
function NotFoundPage(): JSX.Element {
  return (
    <BaseErrorPage title="Erreur 404" data-testid="NotFoundPage">
      La page que vous souhaitez
      <br /> afficher n’existe pas ou plus...
    </BaseErrorPage>
  );
}

export default NotFoundPage;
