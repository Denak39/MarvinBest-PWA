import type { FormikHelpers } from 'formik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { usePostSentenceMutation } from '@app/sentence/sentenceSliceTest';
import type { ISentencesForm } from '@app/types';
import IconAdd from '@components/Icons/IconAdd';
import { useGetPeopleQuery } from '@people/slice';

import '../styles/SentenceForm.scss';

function SentenceForm() {
  const [postSentence] = usePostSentenceMutation();

  const { data: people } = useGetPeopleQuery();

  const initialValues = {
    sentence: '',
    speaker: '',
  };

  const validationSchema = Yup.object().shape({
    sentence: Yup.string().required('Oublie pas la phrase !'),
    speaker: Yup.string().required('Sélectionne une personne...'),
  });

  const handleSubmit = async (
    values: ISentencesForm,
    formikHelpers: FormikHelpers<ISentencesForm>
  ) => {
    const { setSubmitting, resetForm } = formikHelpers;
    try {
      setSubmitting(true);

      await postSentence(values);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setSubmitting(false);

      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="field">
            <label htmlFor="speaker">Personne</label>
            <Field
              as="select"
              id="speaker"
              name="speaker"
              className="field__select"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setFieldValue('speaker', e.target.value);
              }}
            >
              <option value="" disabled>
                Sélectionne une personne...
              </option>
              {people?.data.length &&
                people.data?.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
            </Field>
            <ErrorMessage name="speaker" component="div" className="error" />
          </div>
          <div className="field">
            <label htmlFor="review-text">Phrase</label>
            <textarea
              id="sentence"
              name="sentence"
              className="field__textarea"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFieldValue('sentence', e.target.value);
              }}
              placeholder="Saisis la phrase"
              rows={1}
            />
            <ErrorMessage name="sentence" component="div" className="error" />
          </div>
          <button type="submit">
            Ajouter
            <IconAdd />
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SentenceForm;
