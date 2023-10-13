import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';

import useOnlineStatus from '@hooks/useOnlineStatus';
import { useGetPeopleOptionsQuery } from '@people/slice';
import { addSentenceSchema } from '@sentences/constants';
import { useAddSentenceMutation } from '@sentences/slice';
import type {
  AddSentence,
  AddSentenceForm,
  AddSentenceStorage,
  SentenceFormPageProps,
} from '@sentences/types';
import Button from '@shared/Button/Button';
import FormControl from '@shared/Form/FormControl/FormControl';
import FormErrorMessage from '@shared/Form/FormErrorMessage/FormErrorMessage';
import FormLabel from '@shared/Form/FormLabel/FormLabel';
import Select from '@shared/Form/Select/Select';
import Textarea from '@shared/Form/Textarea/Textarea';
import Header from '@shared/Header/Header';
import IconAdd from '@shared/Icons/IconAdd';
import Skeleton from '@shared/Skeleton/Skeleton';

/**
 * SentenceForm page.
 *
 * @param {SentenceFormPageProps} props Props
 * @return {JSX.Element}
 */
function SentenceFormPage({ saveSentenceToStorage }: SentenceFormPageProps): JSX.Element {
  const isOnline = useOnlineStatus();

  const [addSentence] = useAddSentenceMutation();
  const { data: peopleOptions, isLoading, isError } = useGetPeopleOptionsQuery();

  const initialValues: AddSentenceForm = {
    personId: null,
    sentence: '',
  };

  /**
   * Submit form.
   *
   * @param {AddSentenceForm} values Form values
   * @param {FormikHelpers<AddSentenceForm>} formikHelpers Form helpers
   * @return {Promise<void>}
   */
  const handleSubmit = async (
    values: AddSentenceForm,
    formikHelpers: FormikHelpers<AddSentenceForm>
  ): Promise<void> => {
    const { setSubmitting, resetForm } = formikHelpers;

    if (!isOnline) {
      // TODO: catch error.
      await saveSentenceToStorage({ ...values, id: Date.now() } as AddSentenceStorage)
        .then(() => resetForm())
        .finally(() => setSubmitting(false));
    } else {
      // TODO: catch error.
      await addSentence(values as AddSentence)
        .unwrap()
        .then(() => resetForm())
        .finally(() => setSubmitting(false));
    }
  };

  return (
    <div className="SentenceFormPage">
      <Header goBack>Ajouter une phrase</Header>

      <Formik
        initialValues={initialValues}
        validationSchema={addSentenceSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isValid, dirty, isSubmitting }) => (
          <Form className="SentenceFormPage__form">
            <div>
              <FormControl>
                <FormLabel htmlFor="personId">Personne</FormLabel>
                {isLoading || isError ? (
                  <Skeleton aria-label="Chargement du champ de formulaire pour la sélection d'une personne" />
                ) : (
                  <Select
                    id="personId"
                    name="personId"
                    onChange={handleChange}
                    placeholder="Sélectionner une personne..."
                    required
                    value={values.personId ?? ''}
                  >
                    {peopleOptions?.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                )}
                <FormErrorMessage name="personId" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="sentence">Phrase</FormLabel>
                <Textarea
                  autoFocus
                  id="sentence"
                  name="sentence"
                  onChange={handleChange}
                  placeholder="Saisis la phrase..."
                  required
                  value={values.sentence}
                />
                <FormErrorMessage name="sentence" />
              </FormControl>
            </div>

            <Button
              aria-label="Envoyer la phrase"
              disabled={isSubmitting || !isValid || !dirty}
              icon={IconAdd}
              type="submit"
            >
              Ajouter
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SentenceFormPage;
