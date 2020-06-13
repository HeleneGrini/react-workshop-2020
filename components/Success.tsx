import { useRouter } from "next/router";

export const Success = () => {
  const router = useRouter();
  return (
    <div>
      <h4>Skjema er sendt inn!</h4>
      <button className="btn btn-success" onClick={() => router.push("/")}>
        Gå til forsiden
      </button>
    </div>
  );
};
