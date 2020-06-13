import { Values } from "../pages/form";
import { ChangeEvent, useState, useEffect } from "react";

interface Props {
  values: Values;
  postForm: () => Promise<void>;
  resetForm: () => void;
  setFieldValue: (key: keyof Values, e: ChangeEvent<HTMLInputElement>) => void;
}
export const Form = (props: Props) => {
  const { values, postForm, resetForm, setFieldValue } = props;
  const [errors, setErrors] = useState<{ [key in keyof Values]: boolean }>({
    name: false,
    email: false,
    phoneNumber: false,
    birthDate: false,
    picture: false,
    sex: false,
    acceptTerms: false,
  });

  const [touched, setTouched] = useState<{ [key in keyof Values]: boolean }>({
    name: false,
    email: false,
    phoneNumber: false,
    birthDate: false,
    picture: false,
    sex: false,
    acceptTerms: false,
  });

  const validatons: {
    [key in keyof Values]: undefined | ((v: Values) => boolean);
  } = {
    name: undefined,
    email: undefined,
    phoneNumber: (values) => values.phoneNumber.length > 8,
    birthDate: undefined,
    picture: undefined,
    sex: undefined,
    acceptTerms: undefined,
  };

  useEffect(() => {
    const temp = { ...errors };
    Object.keys(errors).map((key) => {
      if (validatons[key] && !validatons[key](values)) {
        temp[key] = true;
      } else temp[key] = false;
    });
    setErrors(temp);
  }, [values, touched]);

  const formIsValid = Object.values(errors).reduce(
    (acc, currentHasError) => (!acc ? acc : !currentHasError),
    true
  );

  return (
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

        <label className="d-flex flex-column w-50 ">
          <span className="mr-2">Telefonnummer</span>
          <input
            type="number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={(e) => setFieldValue("phoneNumber", e)}
            onBlur={() => setTouched({ ...touched, phoneNumber: true })}
          />
          {touched.phoneNumber && errors.phoneNumber ? (
            <div className="text-danger">Number must be 8 digits</div>
          ) : null}
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

      <button disabled={!formIsValid} className="btn btn-primary btn-sm">
        Submit
      </button>
    </form>
  );
};
