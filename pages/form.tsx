import { useState, ChangeEvent, useEffect, useReducer } from "react";
import { Success } from "../components/Success";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Form } from "../components/Form";
import { useRouter } from "next/router";

const initialValues: Values = {
  name: "",
  email: "",
  phoneNumber: "",
  birthDate: new Date().toISOString().split("T")[0],
  picture: "",
  sex: "",
  acceptTerms: false,
};

export type Values = {
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  picture: string;
  sex: string;
  acceptTerms: boolean;
};

export default () => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(undefined);
  const router = useRouter();

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

  useEffect(() => {
    if (!error && response) {
      router.push("/forms");
    }
  }, [error, response]);

  const renderBody = () => {
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error />;
    } else if (!response) {
      return (
        <Form
          setFieldValue={setFieldValue}
          values={values}
          resetForm={resetForm}
          postForm={postForm}
        />
      );
    } else return null;
  };

  return (
    <div className="container">
      <h1>Form</h1>
      {renderBody()}
    </div>
  );
};
