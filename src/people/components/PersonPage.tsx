import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextField from '@components/Fields/TextField/TextField';
import Header from '@components/Header/Header';
import IconButton from '@components/IconButton/IconButton';
import IconSend from '@components/Icons/IconSend';
import Message from '@components/Message/Message';
import { useGetPersonQuery } from '@people/slice';
import { useAddSentenceMutation } from '@sentences/slice';
import type { AddSentence } from '@sentences/types';

import '@people/styles/PersonPage.scss';

function PersonPage(): JSX.Element {
  const { id } = useParams();

  const [addSentence] = useAddSentenceMutation();
  const { data: person, isLoading } = useGetPersonQuery(parseInt(String(id), 10));

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [person?.sentences]);

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
      .catch((error) => {
        // TODO: display an alert to inform user.

        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const initialValues: AddSentence = {
    sentence: '',
    speaker: `/api/people/${person?.id}`,
  };

  const validationSchema = Yup.object<AddSentence>({
    sentence: Yup.string().required().min(5),
    speaker: Yup.string().required(),
  });

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
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting, values, handleChange }) => (
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
                  disabled={isSubmitting || !isValid}
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
