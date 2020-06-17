import { useEffect, useState } from "react";
var isEqual = require("lodash.isequal");

import { FormItem } from "../components/FormItem";
import { Values, initialState } from "./form";

export default () => {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    fetch("api/form")
      .then((r) => r.json())
      .then((data) => setForms(data));
  }, []);

  const typedForms = forms.filter(isMyType);

  return (
    <>
      <h1>Forms</h1>
      {typedForms?.map((form, i) => (
        <FormItem key={i} form={form} />
      ))}
    </>
  );
};

function isMyType(formObject: any): formObject is Values {
  return isEqual(
    [...Object.keys(initialState), "createdAt"].sort(),
    Object.keys(formObject).sort()
  );
}
