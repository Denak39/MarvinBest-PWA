import type { FormikHelpers } from 'formik';
import { ErrorMessage, Form, Formik } from 'formik';

import Button from '@components/Button/Button';
import Select from '@components/Fields/Select/Select';
import Textarea from '@components/Fields/Textarea/Textarea';
import Header from '@components/Header/Header';
import IconAdd from '@components/Icons/IconAdd';
import useOnlineStatus from '@hooks/useOnlineStatus';
import { useGetPeopleOptionsQuery } from '@people/slice';
import { addSentenceSchema } from '@sentences/constants';
import { useAddSentenceMutation } from '@sentences/slice';
import type { AddSentence, SentenceFormPageProps } from '@sentences/types';

import '@sentences/styles/SentenceForm.scss';

function SentenceFormPage({ saveSentenceToStorage }: SentenceFormPageProps) {
  const [addSentence] = useAddSentenceMutation();

  const isOnline = useOnlineStatus();

  // TODO: use selectPeopleOptions instead of useGetPeopleOptionsQuery.
  const { data: peopleOptions } = useGetPeopleOptionsQuery({
    'order[name]': 'asc',
    pagination: false,
  });

  const initialValues: AddSentence = {
    personId: NaN,
    sentence: '',
  };

  const handleSubmit = async (values: AddSentence, formikHelpers: FormikHelpers<AddSentence>) => {
    const { setSubmitting, resetForm } = formikHelpers;

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

  return (
    <div className="SentenceFormPage">
      <Header title="Ajouter une phrase" goBack />

      <Formik
        initialValues={initialValues}
        validationSchema={addSentenceSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isValid, dirty, isSubmitting }) => (
          <Form className="SentenceFormPage__form">
            <div>
              <div className="SentenceFormPage__form-field">
                <label htmlFor="personId">Personne</label>
                <Select
                  id="personId"
                  name="personId"
                  onChange={handleChange}
                  placeholder="Sélectionner une personne..."
                  value={values.personId || ''}
                >
                  {peopleOptions?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
                <ErrorMessage name="personId" component="div" className="error" />
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

            <Button type="submit" disabled={isSubmitting || !isValid || !dirty}>
              Ajouter
              <IconAdd />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SentenceFormPage;
