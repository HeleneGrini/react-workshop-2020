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
          <label className="d-flex flex-column w-50">
            <span className="mr-2">Navn</span>
            <input type="text" name="name" />
          </label>

          <label className="d-flex flex-column w-50">
            <span className="mr-2">E-post</span>
            <input type="email" name="email" />
          </label>

          <label className="d-flex flex-column w-50">
            <span className="mr-2">Telefonnummer</span>
            <input type="number" name="phoneNumber" />
          </label>
          <label className="d-flex flex-column w-50">
            <span className="mr-2">Fødselsdato</span>
            <input type="date" name="birthDate" />
          </label>

          <label className="d-flex flex-column w-50">
            <span className="mr-2">Last opp et portrettbile</span>
            <input type="file" name="picture" />
          </label>

          <label className="d-flex align-items-center w-50">
            <input className="mr-2" type="radio" name="sex" value="kvinne" />
            Kvinne
          </label>
          <label className="d-flex align-items-center w-50">
            <input className="mr-2" type="radio" name="sex" value="mann" />
            Mann
          </label>
          <label className="d-flex align-items-center w-50">
            <input className="mr-2" type="radio" name="sex" value="other" />
            Annet
          </label>

          <label className="d-flex align-items-center w-50">
            <input
              className="mr-2"
              type="checkbox"
              name="sex"
              value="acceptTerms"
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
