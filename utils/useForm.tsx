import { useState, ChangeEvent, useEffect } from "react";

function generateFalsy<T>(obj: T) {
  const keys = Object.keys(obj) as Array<keyof T>;
  type Shape = {
    [key in keyof T]: boolean;
  };
  let temp: Shape = {} as Shape;
  keys.forEach((key) => (temp[key] = false));
  return temp;
}

export type Form<T> = {
  values: T;
  errors: {
    [key in keyof T]: boolean;
  };
  touched: {
    [key in keyof T]: boolean;
  };
  setTouched: (
    touched: {
      [key in keyof T]: boolean;
    }
  ) => void;
  submitLoading: boolean;
  submitError: boolean;
  submitResponse: any;
  setFieldValue: (key: keyof T, e: ChangeEvent<HTMLInputElement>) => void;
  formIsValid: boolean;
  postForm: (values: any) => Promise<void>;
  resetForm: () => void;
};

export function useForm<T>(options: {
  initialValues: T;
  validatons: {
    [key in keyof T]?: undefined | ((v: T) => boolean);
  };
  endpoint: string;
}): Form<T> {
  const [values, setValues] = useState(options.initialValues);
  const [errors, setErrors] = useState<{ [key in keyof T]: boolean }>(
    generateFalsy(options.initialValues)
  );
  const [touched, setTouched] = useState<{ [key in keyof T]: boolean }>(
    generateFalsy(options.initialValues)
  );

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitResponse, setSubmitResponse] = useState(undefined);

  useEffect(() => {
    const temp = { ...errors };
    Object.keys(errors).map((key) => {
      if (options.validatons[key] && !options.validatons[key](values)) {
        temp[key] = true;
      } else temp[key] = false;
    });
    setErrors(temp);
  }, [values, touched]);

  const setFieldValue = (key: keyof T, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      setValues({ ...values, [key]: Array.from(e.target.files) });
    } else {
      setValues({ ...values, [key]: e.target.value });
    }
  };
  const formIsValid = Object.values(errors).reduce<boolean>(
    (acc, currentHasError) => (!acc ? acc : !currentHasError),
    true
  );

  const postForm = async (formValues: any) => {
    setSubmitLoading(true);
    setSubmitError(false);
    setSubmitResponse(undefined);

    await fetch(options.endpoint, {
      method: "POST",
      body: JSON.stringify(formValues),
    })
      .then((r) => r.json())
      .then((data) => setSubmitResponse(data))
      .catch((err) => setSubmitError(true));
    setSubmitLoading(false);
  };

  const resetForm = () => {
    setValues(options.initialValues);
    setErrors(generateFalsy(values));
    setTouched(generateFalsy(values));
  };

  return {
    values,
    formIsValid,
    setFieldValue,
    submitError,
    submitLoading,
    submitResponse,
    errors,
    touched,
    postForm,
    resetForm,
    setTouched,
  };
}
