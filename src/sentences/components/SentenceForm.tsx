import type { FormikHelpers } from 'formik';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { usePostSentenceMutation } from '@app/sentence/sentenceSlice';
import type { ISentencesForm } from '@app/types';
import Button from '@components/Button/Button';
import SelectField from '@components/Fields/SelectField/SelectField';
import TextAreaField from '@components/Fields/TextAreaField/TextAreaField';
import IconAdd from '@components/Icons/IconAdd';
import { useGetPeopleOptionsQuery } from '@people/slice';
import type { PeopleOptions } from '@people/types';

import '../styles/SentenceForm.scss';

function SentenceForm() {
  const [postSentence] = usePostSentenceMutation();

  const { data: people } = useGetPeopleOptionsQuery();

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
      {({ values, handleChange, isValid, dirty }) => (
        <Form>
          <div className="field">
            <label htmlFor="speaker">Personne</label>
            <SelectField id="speaker" name="speaker" value={values.speaker} onChange={handleChange}>
              <option className="SelectField__placeholder" value="" disabled>
                Sélectionne une personne...
              </option>
              {people?.data
                ? people.data?.map((person: PeopleOptions) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))
                : null}
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
          <Button type="submit" disabled={!isValid || !dirty}>
            Ajouter
            <IconAdd />
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SentenceForm;
