import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';

import TextField from '@components/Fields/TextField/TextField';
import Header from '@components/Header/Header';
import IconButton from '@components/IconButton/IconButton';
import IconSend from '@components/Icons/IconSend';
import Message from '@components/Message/Message';
import { useGetPersonQuery } from '@people/slice';
import type { AddSentence } from '@sentences/types';

import '@people/styles/PersonPage.scss';

function PersonPage(): JSX.Element {
  const { id } = useParams();

  const { data: person, isFetching } = useGetPersonQuery(parseInt(String(id), 10));

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [person?.sentences]);

  const handleSubmit = (values: AddSentence, formikHelpers: FormikHelpers<AddSentence>) => {
    const { setSubmitting } = formikHelpers;

    setSubmitting(true);
  };

  const initialValues: AddSentence = {
    message: '',
    speaker: `/api/people/${person?.id}`,
  };

  return (
    <div className="PersonPage">
      {/* // TODO: add title skeleton loader components. */}
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

      {/* // TODO: add skeleton loader components. */}
      {isFetching && <p>Chargement en cours...</p>}

      {/* // TODO: add a no result component. */}
      {!person?.sentences.length && !isFetching && <p>Aucune phrases disponibles...</p>}

      {!!person && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form className="PersonPage__form">
              {/* // TODO: add skeleton loader components. */}
              <div className="PersonPage__field-wrapper">
                <TextField
                  aria-label={`Écrire une phrase de ${person.name}`}
                  name="message"
                  onChange={handleChange}
                  placeholder={`Écrire une phrase de ${person.name}...`}
                  required
                  value={values.message}
                />

                <IconButton
                  aria-label="Envoyer la phrase"
                  className="PersonPage__form-button"
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
