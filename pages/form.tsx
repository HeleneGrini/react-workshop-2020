import { useState } from "react";
import { Input } from "../components/Input";

interface Values {
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
const Form = () => {
  /**
   * Start writing your form in here
   */
  const [values, setValues] = useState<Values>(initialState);

  const setFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      return setValues({ ...values, [e.target.name]: e.target.checked });
    } else {
      return setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const submitForm = async () =>
    fetch("api/form", {
      method: "POST",
      body: JSON.stringify(values),
    });

  const resetForm = () => setValues(initialState);

  return (
    <div className="container">
      <h1>Form</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await submitForm();
          resetForm();
        }}
      >
        <div className="d-flex flex-column">
          <Input
            label="Name"
            type="text"
            name="name"
            value={values.name}
            onChange={setFieldValue}
          />
          <Input
            label="Epost"
            type="email"
            name="email"
            value={values.email}
            onChange={setFieldValue}
          />
          <Input
            label="Phone number"
            type="number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={setFieldValue}
          />
          <Input
            label="Fødselsdato"
            type="date"
            name="birthDate"
            value={values.birthDate}
            onChange={setFieldValue}
          />
          <Input
            label="Picture"
            type="file"
            name="picture"
            value={values.picture}
            onChange={setFieldValue}
          />
          ¨
          <div className="d-flex flex-column ">
            <Input
              label="Kvinne"
              type="radio"
              name="gender"
              value="kvinne"
              onChange={setFieldValue}
            />
            <Input
              label="Mann"
              type="radio"
              name="gender"
              value="mann"
              onChange={setFieldValue}
            />
            <Input
              label="Ikke binær"
              type="radio"
              name="gender"
              value="nonBinary"
              onChange={setFieldValue}
            />
          </div>
          <Input
            label="Godta vilkår"
            type="checkbox"
            name="acceptTerms"
            checked={values.acceptTerms}
            onChange={setFieldValue}
          />
        </div>
        <button className="btn btn-primary btn-sm">Submit</button>
      </form>
    </div>
  );
};

export default Form;
