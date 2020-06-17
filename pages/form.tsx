import { useState } from "react";
import { Form } from "../components/Form";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Success } from "../components/Success";

export interface Values {
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  picture: string;
  gender: string;
  acceptTerms: boolean;
}

const initialState: Values = {
  name: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  picture: "",
  gender: "",
  acceptTerms: false,
};
const FormPage = () => {
  /**
   * Start writing your form in here
   */
  const [values, setValues] = useState<Values>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [response, setResponse] = useState(undefined);

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

  const renderBody = () => {
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error />;
    } else if (!error && response) {
      return <Success />;
    }
    return (
      <Form
        submitForm={submitForm}
        resetForm={resetForm}
        setFieldValue={setFieldValue}
        values={values}
      />
    );
  };
  return (
    <div className="container">
      <h1>Form</h1>
      {renderBody()}
    </div>
  );
};

export default FormPage;
