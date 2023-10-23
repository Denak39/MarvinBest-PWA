import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';

import useOnlineStatus from '@hooks/useOnlineStatus';
import { useGetPeopleOptionsQuery, useGetPersonQuery } from '@people/slice';
import ModalAddSentenceError from '@sentences/components/ModalAddSentenceError';
import { addSentenceSchema } from '@sentences/constants';
import { SentenceIndexedDBContext } from '@sentences/context';
import { useAddSentenceMutation } from '@sentences/slice';
import type { AddSentence, AddSentenceStorage } from '@sentences/types';
import ErrorPage from '@shared/ErrorPage/ErrorPage/ErrorPage';
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
 * @return {JSX.Element}
 */
function PersonPage(): JSX.Element {
  const { id: stringId } = useParams();
  const id = parseInt(String(stringId), 10);

  const [showModalError, setShowModalError] = useState<boolean>(false);

  const { data: sentencesFromStorage, saveData: saveSentenceToStorage } =
    useContext(SentenceIndexedDBContext);

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
      await saveSentenceToStorage({ ...values, id: Date.now() } as AddSentenceStorage)
        .then(() => resetForm())
        .catch(() => setShowModalError(true))
        .finally(() => setSubmitting(false));
    } else {
      await addSentence(values as AddSentence)
        .unwrap()
        .then(() => resetForm())
        .catch(() => setShowModalError(true))
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
    <div className="PersonPage" data-testid="PersonPage">
      <Header goBack>
        {showSkeleton ? (
          <Skeleton aria-label="Chargement du nom de la personne" className="Skeleton--name" />
        ) : (
          name
        )}
      </Header>

      <ul className="PersonPage__list">
        {isError && (
          <li className="PersonPage__list-error">Impossible de récupérer les anciens messages</li>
        )}

        {isLoading && (
          <li className="PersonPage__list-loading">
            <IconSpinner />
            Chargement des messages...
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
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addSentenceSchema}
      >
        {({ dirty, isValid, isSubmitting, values, handleChange, touched, errors }) => (
          <Form className="PersonPage__form">
            {showSkeleton ? (
              <Skeleton aria-label="Chargement du formulaire" className="Skeleton--field" />
            ) : (
              <div className="PersonPage__field-wrapper">
                <TextField
                  aria-invalid={!!(!!touched.sentence && !!errors.sentence)}
                  name="sentence"
                  onChange={handleChange}
                  placeholder={`Écrire une phrase de ${name}...`}
                  required
                  value={values.sentence}
                />

                <IconButton
                  aria-label="Ajouter la phrase"
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

      <ModalAddSentenceError isVisible={showModalError} onClose={() => setShowModalError(false)} />
    </div>
  );
}

export default PersonPage;
