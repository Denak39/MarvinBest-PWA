import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getMockUsers } from "../mock/user";
import { addSentence } from "@app/sentence/sentenceSlice";
import { useAppDispatch } from "@app/hooks";

const SentenceForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const initialValues = {
    sentence: "",
    userId: 1,
  };

  const validationSchema = Yup.object().shape({
    sentence: Yup.string().required("Sentence is required"),
    userId: Yup.number().required("User is required"),
  });

  class MyCustomError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "MyCustomError";
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        try {
          dispatch(
            addSentence({ sentence: values.sentence, userId: values.userId }),
          );
          resetForm();
        } catch (error) {
          if (error instanceof MyCustomError) {
            console.error(error.message);
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      }}
    >
      <Form>
        <div>
          <label htmlFor="sentence">Sentence:</label>
          <Field type="text" id="sentence" name="sentence" />
          <ErrorMessage name="sentence" component="div" className="error" />
        </div>
        <div>
          <label htmlFor="userId">User:</label>
          <Field as="select" id="userId" name="userId">
            {getMockUsers().map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Field>
          <ErrorMessage name="userId" component="div" className="error" />
        </div>
        <button type="submit">Post Sentence</button>
      </Form>
    </Formik>
  );
};

export default SentenceForm;
