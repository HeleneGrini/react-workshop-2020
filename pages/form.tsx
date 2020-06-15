import { Input } from "../components/Input";

const Form = () => {
  /**
   * Start writing your form in here
   */
  return (
    <div className="container">
      <h1>Form</h1>
      <form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
      >
        <div className="d-flex flex-column">
          <Input label="Navn" type="text" name="name" />

          <Input label="E-post" type="email" name="email" />
          <Input label="Telefonnummer" type="number" name="phoneNumber" />
          <Input label="Fødselsdato" type="date" name="birthDate" />

          <Input label="Last opp et portrettbile" type="file" name="picture" />

          <Input
            label="Kvinne"
            labelAfter={true}
            type="radio"
            name="sex"
            value="kvinne"
          />
          <Input
            label="Kvinne"
            labelAfter={true}
            type="radio"
            name="sex"
            value="mann"
          />
          <Input
            label="Kvinne"
            labelAfter={true}
            type="radio"
            name="sex"
            value="other"
          />

          <Input
            label="Godta vilkår"
            type="checkbox"
            name="picture"
            value="acceptTerms"
            labelAfter={true}
          />
        </div>

        <button className="btn btn-primary btn-sm">Submit</button>
      </form>
    </div>
  );
};

export default Form;
