import { Input } from "./Input";
import { Values } from "../pages/form";

interface Props {
  submitForm: () => Promise<void>;
  resetForm: () => void;
  setFieldValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: Values;
}

export const Form = (props: Props) => {
  const { submitForm, resetForm, values, setFieldValue } = props;
  return (
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
  );
};
