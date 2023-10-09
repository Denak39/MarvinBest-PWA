import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';

import ErrorPage from '@components/ErrorPage/ErrorPage';
import TextField from '@components/Fields/TextField/TextField';
import Header from '@components/Header/Header';
import IconButton from '@components/IconButton/IconButton';
import IconSend from '@components/Icons/IconSend';
import IconSpinner from '@components/Icons/IconSpinner';
import Message from '@components/Message/Message';
import Skeleton from '@components/Skeleton/Skeleton';
import { useAppSelector } from '@hooks/useAppSelector';
import useOnlineStatus from '@hooks/useOnlineStatus';
import { selectPersonById } from '@people/selectors';
import { useGetPersonQuery } from '@people/slice';
import type { PersonPageProps } from '@people/types';
import { addSentenceSchema } from '@sentences/constants';
import { useAddSentenceMutation } from '@sentences/slice';
import type { AddSentence } from '@sentences/types';

import '@people/styles/PersonPage.scss';

function PersonPage({ saveSentenceToStorage, sentencesFromStorage }: PersonPageProps): JSX.Element {
  const { id: stringId } = useParams();
  const id = parseInt(String(stringId), 10);

  const [addSentence] = useAddSentenceMutation();

  const isOnline = useOnlineStatus();

  const dataRecovered = useAppSelector((state) => selectPersonById(state, id));
  const {
    data: person = dataRecovered,
    isLoading,
    isError,
  } = useGetPersonQuery(id, { skip: !isOnline });

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [person?.sentences, sentencesFromStorage]);

  if (isError && !dataRecovered) return <ErrorPage />;

  /**
   * Handle submit form.
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
      await saveSentenceToStorage({ ...values, id: Date.now() })
        .then(() => resetForm())
        .finally(() => setSubmitting(false));
    } else {
      await addSentence(values)
        .unwrap()
        .then(() => resetForm())
        .finally(() => setSubmitting(false));
    }
  };

  const initialValues: AddSentence = {
    personId: person?.id ?? NaN,
    sentence: '',
  };

  return (
    <div className="PersonPage">
      <Header goBack>
        {isLoading ? (
          <Skeleton height="1.625rem" width="clamp(2rem, 30%, 10rem)" />
        ) : (
          person?.name || ''
        )}
      </Header>

      {!!person && (
        <ul className="PersonPage__list">
          {[...person.sentences].reverse().map((sentence) => (
            <li key={sentence.id}>
              <Message name={person.name} date={sentence.createdAt}>
                {sentence.message}
              </Message>
            </li>
          ))}

          {sentencesFromStorage
            .filter((sentence) => sentence.personId === id)
            .map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`waiting-${index}`}>
                <Message name={person.name} isWaiting>
                  {item.sentence}
                </Message>
              </li>
            ))}
        </ul>
      )}

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount
        validationSchema={addSentenceSchema}
      >
        {({ dirty, isValid, isSubmitting, values, handleChange }) => (
          <Form className="PersonPage__form">
            {isLoading || !person ? (
              <Skeleton height="3.625rem" />
            ) : (
              <div className="PersonPage__field-wrapper">
                <TextField
                  aria-label={`Écrire une phrase de ${person.name}`}
                  name="sentence"
                  onChange={handleChange}
                  placeholder={`Écrire une phrase de ${person.name}...`}
                  required
                  value={values.sentence}
                />

                <IconButton
                  aria-label="Envoyer la phrase"
                  className="PersonPage__form-button"
                  disabled={!dirty || isSubmitting || !isValid}
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
