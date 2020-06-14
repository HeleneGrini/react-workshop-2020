import { useEffect } from "react";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Form } from "../components/Form";
import { useRouter } from "next/router";
import { useForm } from "../utils/useForm";
import { useFileUpload } from "../utils/useFileUpload";

const initialValues: Values = {
  name: "",
  email: "",
  phoneNumber: "",
  birthDate: new Date().toISOString().split("T")[0],
  picture: [] as File[],
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
  const fileUpload = useFileUpload();
  const form = useForm({
    initialValues,
    validatons: {
      phoneNumber: (values) => values.phoneNumber.length >= 8,
    },
    endpoint: "api/form",
  });

  const error = form.submitError || fileUpload.error;
  const loading = form.submitLoading || fileUpload.loading;
  const redirect = !error && form.submitResponse;

  useEffect(() => {
    if (redirect) {
      router.push("/forms");
    }
  }, [redirect]);

  const renderBody = () => {
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error />;
    } else if (!loading && !error) {
      return <Form form={form} upload={fileUpload.upload} />;
    } else return null;
  };

  return (
    <div className="container">
      <h1>Form</h1>
      {renderBody()}
    </div>
  );
};
