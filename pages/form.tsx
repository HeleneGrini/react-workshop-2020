import { useState, useEffect } from "react";
import { Form } from "../components/Form";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Success } from "../components/Success";
import { useRouter } from "next/router";

export interface Values {
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  picture: string;
  gender: string;
  acceptTerms: boolean;
}

export const initialState: Values = {
  name: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  picture: "",
  gender: "",
  acceptTerms: false,
};
const FormPage = () => {
  const [values, setValues] = useState<Values>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [response, setResponse] = useState(undefined);
  const router = useRouter();

  const setFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      return setValues({ ...values, [e.target.name]: e.target.checked });
    } else {
      return setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  const resetForm = () => setValues(initialState);

  const submitForm = async () => {
    setLoading(true);
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
          submitForm={submitForm}
          resetForm={resetForm}
          setFieldValue={setFieldValue}
          values={values}
        />
      );
    }
    return null;
  };
  return (
    <div className="container">
      <h1>Form</h1>
      {renderBody()}
    </div>
  );
};

export default FormPage;
