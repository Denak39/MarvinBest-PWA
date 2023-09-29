import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';

import { useAppSelector } from '@app/hooks';
import ErrorPage from '@components/ErrorPage/ErrorPage';
import TextField from '@components/Fields/TextField/TextField';
import Header from '@components/Header/Header';
import IconButton from '@components/IconButton/IconButton';
import IconSend from '@components/Icons/IconSend';
import Message from '@components/Message/Message';
import { selectPersonById } from '@people/selectors';
import { useGetPersonQuery } from '@people/slice';
import { addSentenceSchema } from '@sentences/constants';
import { useAddSentenceMutation } from '@sentences/slice';
import type { AddSentence } from '@sentences/types';

import '@people/styles/PersonPage.scss';

function PersonPage(): JSX.Element {
  const { id: stringId } = useParams();
  const id = parseInt(String(stringId), 10);

  const [addSentence] = useAddSentenceMutation();

  const dateRecovered = useAppSelector((state) => selectPersonById(state, id));
  const {
    data: person = dateRecovered,
    isLoading,
    isError,
  } = useGetPersonQuery(id, { skip: !!dateRecovered });

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [person?.sentences]);

  if (isError) return <ErrorPage />;

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

    if (!person) return;
    setSubmitting(true);

    await addSentence(values)
      .unwrap()
      .then(() => {
        resetForm();
        // TODO: unvalidate form because after this, isValid property is always to true.
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const initialValues: AddSentence = {
    personId: person?.id ?? NaN,
    sentence: '',
  };

  return (
    <div className="PersonPage">
      {/* TODO: add title skeleton loader components. */}
      <Header title={person?.name || ''} goBack />

      {!!person?.sentences.length && (
        <ul className="PersonPage__list">
          {[...person.sentences].reverse().map((sentence) => (
            <li key={sentence.id}>
              <Message name={person.name} date={sentence.createdAt}>
                {sentence.message}
              </Message>
            </li>
          ))}
        </ul>
      )}

      {/* TODO: add skeleton loader components. */}
      {isLoading && <p>Chargement en cours...</p>}

      {/* TODO: add a no result component. */}

      {!!person && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnMount
          validationSchema={addSentenceSchema}
        >
          {({ dirty, isValid, isSubmitting, values, handleChange }) => (
            <Form className="PersonPage__form">
              {/* TODO: add skeleton loader components. */}
              <div className="PersonPage__field-wrapper">
                <TextField
                  aria-label={`Écrire une phrase de ${person.name}`}
                  name="sentence"
                  onChange={handleChange}
                  placeholder={`Écrire une phrase de ${person.name}...`}
                  required
                  value={values.sentence}
                />

                {/* TODO: add a loader button when form is submitting. */}
                <IconButton
                  aria-label="Envoyer la phrase"
                  className="PersonPage__form-button"
                  disabled={!dirty || isSubmitting || !isValid}
                  type="submit"
                >
                  <IconSend />
                </IconButton>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default PersonPage;
