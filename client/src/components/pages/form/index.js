import "./styles.css";
import { ADD_TODO, GET_TODOS } from "../../../lib/queries";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";

const validationSchema = yup.object().shape({
  title: yup.string().min(2).required("Provide title"),
  description: yup.string().min(2).required("Provide description"),
});

const CustomeForm = () => {
  const [onAddTodo] = useMutation(ADD_TODO);

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async ({ title, description }, { resetForm }) => {
          await onAddTodo({
            variables: { title, description },
            refetchQueries: [{ query: GET_TODOS }],
          });

          resetForm();
        }}
      >
        {({ handleChange, isSubmitting, values: { title, description } }) => (
          <Form>
            <h2 htmlFor="image">Add Todo Name</h2>
            <div className="input-container">
              <Field
                type="text"
                name="title"
                value={title}
                placeholder="title"
                onChange={handleChange}
              />
              <Field
                type="text"
                name="description"
                placeholder="description"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="btn">
              <button type="submit" padding="15px 30px">
                {isSubmitting ? " Loading ... " : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default CustomeForm;
