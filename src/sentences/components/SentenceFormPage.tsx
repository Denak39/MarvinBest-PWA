import { useState } from 'react';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';

import useOnlineStatus from '@hooks/useOnlineStatus';
import { useGetPeopleOptionsQuery } from '@people/slice';
import { addSentenceSchema } from '@sentences/constants';
import { useAddSentenceMutation } from '@sentences/slice';
import type { AddSentence, AddSentenceStorage, SentenceFormPageProps } from '@sentences/types';
import Button from '@shared/Button/Button';
import FormControl from '@shared/Form/FormControl/FormControl';
import FormErrorMessage from '@shared/Form/FormErrorMessage/FormErrorMessage';
import FormLabel from '@shared/Form/FormLabel/FormLabel';
import Select from '@shared/Form/Select/Select';
import Textarea from '@shared/Form/Textarea/Textarea';
import Header from '@shared/Header/Header';
import IconAdd from '@shared/Icons/IconAdd';
import IconCheck from '@shared/Icons/IconCheck';
import IconCross from '@shared/Icons/IconCross';
import Modal from '@shared/Modal/Modal';
import Skeleton from '@shared/Skeleton/Skeleton';

/**
 * SentenceForm page.
 *
 * @param {SentenceFormPageProps} props Props
 * @return {JSX.Element}
 */
function SentenceFormPage({ saveSentenceToStorage }: SentenceFormPageProps): JSX.Element {
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);

  const isOnline = useOnlineStatus();

  const [addSentence] = useAddSentenceMutation();
  const { data: peopleOptions, isLoading, isError } = useGetPeopleOptionsQuery();

  const initialValues: AddSentence = {
    personId: '',
    sentence: '',
  };

  /**
   * Submit form.
   *
   * @param {AddSentence} values Form values
   * @param {FormikHelpers<AddSentence>} formikHelpers Form helpers
   * @return {Promise<void>}
   */
  const handleSubmit = async (
    values: AddSentence,
    formikHelpers: FormikHelpers<AddSentence>
  ): Promise<void> => {
    const { setSubmitting, resetForm } = formikHelpers;

    const initialValuesReset = { ...initialValues, personId: values.personId };

    if (!isOnline) {
      await saveSentenceToStorage({ ...values, id: Date.now() } as AddSentenceStorage)
        .then(() => {
          setShowModalSuccess(true);
          resetForm({ values: initialValuesReset });
        })
        .catch(() => {
          setShowModalError(true);
        })
        .finally(() => setSubmitting(false));
    } else {
      await addSentence(values as AddSentence)
        .then(() => {
          setShowModalSuccess(true);
          resetForm({ values: initialValuesReset });
        })
        .catch(() => {
          setShowModalError(true);
        })
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
                    value={values.personId}
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

      <Modal
        icon={IconCheck}
        isVisible={showModalSuccess}
        onClose={() => setShowModalSuccess(false)}
        title="Phrase ajoutée"
      >
        <p>La phrase a bien été ajoutée !</p>
      </Modal>

      <Modal
        icon={IconCross}
        isVisible={showModalError}
        onClose={() => setShowModalError(false)}
        title="Oups..."
      >
        <p>
          Une erreur est survenue !
          <br /> La phrase n&apos;a pas pu être ajoutée.
        </p>
      </Modal>
    </div>
  );
}

export default SentenceFormPage;
