import { useState, ChangeEvent } from "react";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  birthDate: new Date().toISOString().split("T")[0],
  picture: "",
  sex: "",
  acceptTerms: false,
};

const Form = () => {
  const [values, setValues] = useState(initialValues);
  const setFieldValue = (
    key: keyof typeof values,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [key]: e.target.value });
  };
  const resetForm = () => setValues(initialValues);
  const postForm = async () => {
    await fetch("api/form", {
      method: "POST",
      body: JSON.stringify(values),
    });
  };

  return (
    <div className="container">
      <h1>Form</h1>
      <form
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          await postForm();
          resetForm();
        }}
      >
        <div className="d-flex flex-column">
          <label className="d-flex flex-column w-50">
            <span className="mr-2">Navn</span>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={(e) => setFieldValue("name", e)}
            />
          </label>

          <label className="d-flex flex-column w-50">
            <span className="mr-2">E-post</span>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={(e) => setFieldValue("email", e)}
            />
          </label>

          <label className="d-flex flex-column w-50">
            <span className="mr-2">Telefonnummer</span>
            <input
              type="number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={(e) => setFieldValue("phoneNumber", e)}
            />
          </label>
          <label className="d-flex flex-column w-50">
            <span className="mr-2">Fødselsdato</span>
            <input
              type="date"
              name="birthDate"
              value={values.birthDate}
              onChange={(e) => setFieldValue("birthDate", e)}
            />
          </label>

          <label className="d-flex flex-column w-50">
            <span className="mr-2">Last opp et portrettbile</span>
            <input
              type="file"
              name="picture"
              value={values.picture}
              onChange={(e) => setFieldValue("picture", e)}
            />
          </label>

          <label className="d-flex align-items-center w-50">
            <input
              className="mr-2"
              type="radio"
              name="sex"
              value="kvinne"
              onChange={(e) => setFieldValue("sex", e)}
            />
            Kvinne
          </label>
          <label className="d-flex align-items-center w-50">
            <input
              className="mr-2"
              type="radio"
              name="sex"
              value="mann"
              onChange={(e) => setFieldValue("sex", e)}
            />
            Mann
          </label>
          <label className="d-flex align-items-center w-50">
            <input
              className="mr-2"
              type="radio"
              name="sex"
              value="other"
              onChange={(e) => setFieldValue("sex", e)}
            />
            Annet
          </label>

          <label className="d-flex align-items-center w-50">
            <input
              className="mr-2"
              type="checkbox"
              name="sex"
              value="acceptTerms"
              onChange={(e) => setFieldValue("acceptTerms", e)}
              checked={values.acceptTerms}
            />
            Godta vilkår
          </label>
        </div>

        <button className="btn btn-primary btn-sm">Submit</button>
      </form>
    </div>
  );
};

export default Form;
