import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '@app/hooks';
import { addSentence } from '@app/sentence/sentenceSlice';
import { mockUsers } from '@mocks/user';

function SentenceForm() {
  const dispatch = useAppDispatch();

  const initialValues = {
    sentence: '',
    userId: 1,
  };

  const validationSchema = Yup.object().shape({
    sentence: Yup.string().required('Sentence is required'),
    userId: Yup.number().required('User is required'),
  });

  class MyCustomError extends Error {
    constructor(message: string) {
      super(message);
      // eslint-disable-next-line react/no-this-in-sfc
      this.name = 'MyCustomError';
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        try {
          dispatch(addSentence({ sentence: values.sentence, userId: values.userId }));
          resetForm();
        } catch (error) {
          if (error instanceof MyCustomError) {
            // eslint-disable-next-line no-console
            console.error(error.message);
          } else {
            // eslint-disable-next-line no-console
            console.error('An unexpected error occurred:', error);
          }
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="sentence">Sentence:</label>
            <Field type="text" id="sentence" name="sentence" />
            <ErrorMessage name="sentence" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="userId">User:</label>
            <Field
              as="select"
              id="userId"
              name="userId"
              onChange={(e: { target: { value: string } }) => {
                setFieldValue('userId', parseInt(e.target.value, 10));
              }}
            >
              {mockUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="userId" component="div" className="error" />
          </div>
          <button type="submit">Post Sentence</button>
        </Form>
      )}
    </Formik>
  );
}

export default SentenceForm;
