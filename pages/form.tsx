import { useState, ChangeEvent } from "react";
import { Success } from "../components/Success";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Form } from "../components/Form";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  birthDate: new Date().toISOString().split("T")[0],
  picture: "",
  sex: "",
  acceptTerms: false,
};

export type Values = typeof initialValues;

export default () => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(undefined);

  const setFieldValue = (
    key: keyof typeof values,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [key]: e.target.value });
  };
  const resetForm = () => setValues(initialValues);
  const postForm = async () => {
    setLoading(true);
    setError(false);
    setResponse(undefined);
    await fetch("api/form", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((r) => r.json())
      .then((data) => setResponse(data))
      .catch((err) => setError(true));
    setLoading(false);
  };

  const renderBody = () => {
    if (loading) {
      return <Loading />;
    } else if (error) {
      <Error />;
    } else if (response) {
      return <Success />;
    } else {
      return (
        <Form
          setFieldValue={setFieldValue}
          values={values}
          resetForm={resetForm}
          postForm={postForm}
        />
      );
    }
  };

  return (
    <div className="container">
      <h1>Form</h1>
      {renderBody()}
    </div>
  );
};
