import { useContext, useState } from 'react';
import type { FormikHelpers } from 'formik';
import { Form, Formik } from 'formik';

import useOnlineStatus from '@hooks/useOnlineStatus';
import { useGetPeopleOptionsQuery } from '@people/slice';
import ModalAddSentenceError from '@sentences/components/ModalAddSentenceError';
import { addSentenceSchema } from '@sentences/constants';
import { SentenceIndexedDBContext } from '@sentences/context';
import { useAddSentenceMutation } from '@sentences/slice';
import type { AddSentence, AddSentenceStorage } from '@sentences/types';
import Button from '@shared/Button/Button';
import FormControl from '@shared/Form/FormControl/FormControl';
import FormErrorMessage from '@shared/Form/FormErrorMessage/FormErrorMessage';
import FormLabel from '@shared/Form/FormLabel/FormLabel';
import Select from '@shared/Form/Select/Select';
import Textarea from '@shared/Form/Textarea/Textarea';
import Header from '@shared/Header/Header';
import IconAdd from '@shared/Icons/components/IconAdd';
import IconCheck from '@shared/Icons/components/IconCheck';
import IconSpinner from '@shared/Icons/components/IconSpinner';
import Modal from '@shared/Modal/Modal';
import Skeleton from '@shared/Skeleton/Skeleton';

/**
 * SentenceForm page.
 *
 * @return {JSX.Element}
 */
function SentenceFormPage(): JSX.Element {
  const { saveData: saveSentenceToStorage } = useContext(SentenceIndexedDBContext);

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
        .catch(() => setShowModalError(true))
        .finally(() => setSubmitting(false));
    } else {
      await addSentence(values as AddSentence)
        .unwrap()
        .then(() => {
          setShowModalSuccess(true);
          resetForm({ values: initialValuesReset });
        })
        .catch(() => setShowModalError(true))
        .finally(() => setSubmitting(false));
    }
  };

  return (
    <div className="SentenceFormPage" data-testid="SentenceFormPage">
      <Header goBack>Ajouter une phrase</Header>

      <Formik
        initialValues={initialValues}
        validationSchema={addSentenceSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isValid, dirty, isSubmitting, touched, errors }) => (
          <Form className="SentenceFormPage__form">
            <div>
              <FormControl>
                <FormLabel htmlFor="personId">Personne</FormLabel>
                {isLoading || isError ? (
                  <Skeleton aria-label="Chargement du champ de formulaire pour la sélection d'une personne" />
                ) : (
                  <Select
                    aria-errormessage={
                      !!touched.personId && !!errors.personId ? 'error-personId' : undefined
                    }
                    aria-invalid={!!(!!touched.personId && !!errors.personId)}
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
                <FormErrorMessage id="error-personId">
                  {!!touched.personId && !!errors.personId ? errors.personId : ''}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="sentence">Phrase</FormLabel>
                <Textarea
                  aria-errormessage={
                    !!touched.sentence && !!errors.sentence ? 'error-sentence' : undefined
                  }
                  aria-invalid={!!(!!touched.sentence && !!errors.sentence)}
                  id="sentence"
                  name="sentence"
                  onChange={handleChange}
                  placeholder="Saisis la phrase..."
                  required
                  value={values.sentence}
                />
                <FormErrorMessage id="error-sentence">
                  {!!touched.sentence && !!errors.sentence ? errors.sentence : ''}
                </FormErrorMessage>
              </FormControl>
            </div>

            <Button
              aria-label="Ajouter la phrase"
              disabled={isSubmitting || !isValid || !dirty}
              iconRight={!isSubmitting ? IconAdd : undefined}
              type="submit"
            >
              {isSubmitting ? <IconSpinner /> : 'Ajouter'}
            </Button>
          </Form>
        )}
      </Formik>

      <Modal
        data-testid="ModalAddSentenceSuccess"
        icon={IconCheck}
        isVisible={showModalSuccess}
        onClose={() => setShowModalSuccess(false)}
        title="Phrase ajoutée"
      >
        <p>La phrase a bien été ajoutée !</p>
      </Modal>

      <ModalAddSentenceError isVisible={showModalError} onClose={() => setShowModalError(false)} />
    </div>
  );
}

export default SentenceFormPage;
