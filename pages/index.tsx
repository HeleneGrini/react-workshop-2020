import { useRouter } from "next/router";

export default () => {
  const router = useRouter();

  return (
    <div className="container d-flex flex-column justify-content-center">
      <button
        type="button"
        className="btn btn-outline-secondary btn-lg btn-block mx-auto w-50"
        style={{ transform: "translateY(-50%)" }}
        onClick={() => router.push("/form")}
      >
        Gå til skjema
      </button>
    </div>
  );
};
