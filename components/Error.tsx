import { useRouter } from "next/router";

export const Error = () => {
  const router = useRouter();
  return (
    <div>
      <h4>Oi, noe gikk galt!</h4>
      <button className="btn btn-waning" onClick={() => router.push("/")}>
        Gå til forsiden
      </button>
    </div>
  );
};
