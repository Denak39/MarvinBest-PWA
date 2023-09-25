import type { FormikHelpers } from 'formik';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { usePostSentenceMutation } from '@app/sentence/sentenceSliceTest';
import type { ISentencesForm } from '@app/types';
import SelectField from '@components/Fields/SelectField/SelectField';
import TextAreaField from '@components/Fields/TextAreaField/TextAreaField';
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
    // console.log(values);
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
      {({ values, handleChange }) => (
        <Form>
          <div className="field">
            <label htmlFor="speaker">Personne</label>
            <SelectField
              id="speaker"
              name="speaker"
              value={values.speaker}
              onChange={handleChange}
            >
              <option className="SelectField__placeholder" value="" disabled>
                Sélectionne une personne...
              </option>
              {people?.data.length &&
                people.data?.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
            </SelectField>
            <ErrorMessage name="speaker" component="div" className="error" />
          </div>
          <div className="field">
            <label htmlFor="review-text">Phrase</label>
            <TextAreaField
              placeholder="Saisis la phrase..."
              id="sentence"
              name="sentence"
              value={values.sentence}
              onChange={handleChange}
              rows={5}
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
