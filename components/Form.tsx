import { Values } from "../pages/form";
import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import * as form from "../utils/useForm";
import { useFileUpload } from "../utils/useFileUpload";

interface Props {
  form: form.Form<Values>;
  upload: (file: File) => any;
}
export const Form = (props: Props) => {
  const {
    values,
    postForm,
    resetForm,
    setFieldValue,
    formIsValid,
    touched,
    setTouched,
    errors,
  } = props.form;

  const uploadPictures = async () =>
    Promise.all(values.picture.map((pic) => props.upload(pic)));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    const urls = await uploadPictures();
    await postForm({ ...values, picture: urls });
    resetForm();
  };

  return (
    <form method="post" onSubmit={submit}>
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
