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
        <div className="d-flex">
          <input type="text" />
          <button className="btn btn-primary btn-sm">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
