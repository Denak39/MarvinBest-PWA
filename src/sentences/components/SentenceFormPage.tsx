import type { FormikHelpers } from 'formik';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';

import Button from '@components/Button/Button';
import Select from '@components/Fields/Select/Select';
import Textarea from '@components/Fields/Textarea/Textarea';
import Header from '@components/Header/Header';
import IconAdd from '@components/Icons/IconAdd';
import { useGetPeopleOptionsQuery } from '@people/slice';
import { useAddSentenceMutation } from '@sentences/slice';
import type { AddSentence } from '@sentences/types';

import '@sentences/styles/SentenceForm.scss';

function SentenceForm() {
  const [addSentence] = useAddSentenceMutation();

  const { data: people } = useGetPeopleOptionsQuery();

  const initialValues = {
    sentence: '',
    speaker: '',
  };

  const validationSchema = Yup.object().shape({
    sentence: Yup.string().required('Oublie pas la phrase !'),
    speaker: Yup.string().required('Sélectionne une personne...'),
  });

  const handleSubmit = async (values: AddSentence, formikHelpers: FormikHelpers<AddSentence>) => {
    const { setSubmitting, resetForm } = formikHelpers;
    await addSentence(values)
      .unwrap()
      .then(() => {
        resetForm();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="SentenceFormPage">
      <Header title="Ajouter une phrase" goBack />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isValid, dirty, isSubmitting }) => (
          <Form className="SentenceFormPage__form">
            <div>
              <div className="SentenceFormPage__form-field">
                <label htmlFor="speaker">Personne</label>
                <Select id="speaker" name="speaker" value={values.speaker} onChange={handleChange}>
                  <option value="" disabled>
                    Sélectionne une personne...
                  </option>
                  {people?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
                <ErrorMessage name="speaker" component="div" className="error" />
              </div>
              <div className="SentenceFormPage__form-field">
                <label htmlFor="sentence">Phrase</label>
                <Textarea
                  placeholder="Saisis la phrase..."
                  id="sentence"
                  name="sentence"
                  value={values.sentence}
                  onChange={handleChange}
                  rows={5}
                />
                <ErrorMessage name="sentence" component="div" className="error" />
              </div>
            </div>

            <Button
              className="SentenceFormPage__form-button"
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
            >
              Ajouter
              <IconAdd />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SentenceForm;
