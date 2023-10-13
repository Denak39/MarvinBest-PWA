import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';

import useOnlineStatus from '@hooks/useOnlineStatus';
import { useGetPeopleOptionsQuery, useGetPersonQuery } from '@people/slice';
import type { PersonPageProps } from '@people/types';
import { addSentenceSchema } from '@sentences/constants';
import { useAddSentenceMutation } from '@sentences/slice';
import type { AddSentence, AddSentenceStorage } from '@sentences/types';
import ErrorPage from '@shared/ErrorPage/ErrorPage';
import TextField from '@shared/Form/TextField/TextField';
import Header from '@shared/Header/Header';
import IconButton from '@shared/IconButton/IconButton';
import IconSend from '@shared/Icons/IconSend';
import IconSpinner from '@shared/Icons/IconSpinner';
import Message from '@shared/Message/Message';
import Skeleton from '@shared/Skeleton/Skeleton';

/**
 * Person page.
 *
 * @param {PersonPageProps} props Props
 * @return {JSX.Element}
 */
function PersonPage({ saveSentenceToStorage, sentencesFromStorage }: PersonPageProps): JSX.Element {
  const { id: stringId } = useParams();
  const id = parseInt(String(stringId), 10);

  const isOnline = useOnlineStatus();

  const [addSentence] = useAddSentenceMutation();
  const {
    data: peopleOptions,
    isLoading: peopleOptionsIsLoading,
    isError: peopleOptionsIsError,
  } = useGetPeopleOptionsQuery();
  const { data: person, isLoading, isError } = useGetPersonQuery(id);

  const personInfo = peopleOptions?.find((personOption) => personOption.id === id);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [person?.sentences, sentencesFromStorage]);

  if (isError && peopleOptionsIsError) return <ErrorPage />;

  /**
   * Submit form.
   *
   * @param {AddSentence} values Form values
   * @param {FormikHelpers<AddSentence>} formikHelpers Formik helpers
   * @return {Promise<void>}
   */
  const handleSubmit = async (
    values: AddSentence,
    formikHelpers: FormikHelpers<AddSentence>
  ): Promise<void> => {
    const { resetForm, setSubmitting } = formikHelpers;

    if (!isOnline) {
      // TODO: catch error.
      await saveSentenceToStorage({ ...values, id: Date.now() } as AddSentenceStorage)
        .then(() => resetForm())
        .finally(() => setSubmitting(false));
    } else {
      // TODO: catch error.
      await addSentence(values as AddSentence)
        .unwrap()
        .then(() => resetForm())
        .finally(() => setSubmitting(false));
    }
  };

  const initialValues: AddSentence = {
    personId: String(person?.id ?? personInfo?.id ?? ''),
    sentence: '',
  };

  const showSkeleton = isLoading || peopleOptionsIsLoading;
  const name = person?.name ?? personInfo?.name ?? '';

  return (
    <div className="PersonPage">
      <Header goBack>
        {showSkeleton ? (
          <Skeleton aria-label="Chargement du nom de la personne" className="Skeleton--name" />
        ) : (
          name
        )}
      </Header>

      <ul className="PersonPage__list">
        {isError && !isOnline && (
          <li
            aria-label="Connectez-vous à Internet pour afficher les anciens messages"
            className="PersonPage__list-error"
          >
            Impossible de récupérer les anciens messages.
            <br /> Connectez-vous à Internet pour les afficher.
          </li>
        )}

        {isLoading && (
          <li aria-label="Chargement des messages" className="PersonPage__list-loading">
            <IconSpinner />
            Chargement des messages
          </li>
        )}

        {!!person &&
          [...person.sentences].reverse().map((sentence) => (
            <li key={sentence.id}>
              <Message name={name} date={sentence.createdAt}>
                {sentence.message}
              </Message>
            </li>
          ))}

        {sentencesFromStorage
          .filter((sentence) => parseInt(sentence.personId, 10) === id)
          .map((item, index) => (
            <li key={`waiting-${index}`}>
              <Message name={name} isWaiting>
                {item.sentence}
              </Message>
            </li>
          ))}
      </ul>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount
        validationSchema={addSentenceSchema}
      >
        {({ dirty, isValid, isSubmitting, values, handleChange }) => (
          <Form className="PersonPage__form">
            {showSkeleton ? (
              <Skeleton aria-label="Chargement du formulaire" className="Skeleton--field" />
            ) : (
              <div className="PersonPage__field-wrapper">
                <TextField
                  aria-label={`Écrire une phrase de ${name}`}
                  name="sentence"
                  onChange={handleChange}
                  placeholder={`Écrire une phrase de ${name}...`}
                  required
                  value={values.sentence}
                />

                <IconButton
                  aria-label="Envoyer la phrase"
                  className="PersonPage__form-button"
                  disabled={isSubmitting || !isValid || !dirty}
                  type="submit"
                >
                  {isSubmitting ? <IconSpinner /> : <IconSend />}
                </IconButton>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PersonPage;
