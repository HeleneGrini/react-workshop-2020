import { useState, ChangeEvent, useEffect, useReducer } from "react";
import { Success } from "../components/Success";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Form } from "../components/Form";
import { useRouter } from "next/router";
import { useForm } from "../utils/useForm";

const initialValues: Values = {
  name: "",
  email: "",
  phoneNumber: "",
  birthDate: new Date().toISOString().split("T")[0],
  picture: "",
  sex: "",
  acceptTerms: false,
};

export type Values = {
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  picture: string;
  sex: string;
  acceptTerms: boolean;
};

export default () => {
  const router = useRouter();
  const form = useForm({
    initialValues,
    validatons: {
      phoneNumber: (values) => values.phoneNumber.length >= 8,
    },
    endpoint: "api/form",
  });
  const { submitError, submitResponse, submitLoading } = form;

  useEffect(() => {
    if (!submitError && submitResponse) {
      router.push("/forms");
    }
  }, [submitError, submitResponse]);

  const renderBody = () => {
    if (submitLoading) {
      return <Loading />;
    } else if (submitError) {
      return <Error />;
    } else if (!submitLoading && !submitError) {
      return <Form form={form} />;
    } else return null;
  };

  return (
    <div className="container">
      <h1>Form</h1>
      {renderBody()}
    </div>
  );
};
