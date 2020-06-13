import { useState, useEffect } from "react";
import { FormListItem } from "../components/FormListItem";

export default () => {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getForms = async () => {
    setError(false);
    setLoading(true);
    setLoading;
    await fetch("api/form")
      .then((r) => r.json())
      .then((data) => setForms(data))
      .catch(() => setError(true));
    setLoading(false);
  };
  useEffect(() => {
    getForms();
  }, []);

  return (
    <div className="container pt-5">
      <h2>Dine innsendte skjemaer</h2>
      {forms.map((form, i) => (
        <FormListItem key={i} form={form} />
      ))}
    </div>
  );
};
