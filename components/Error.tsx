import { useRouter } from "next/router";

export const Error = () => {
  const router = useRouter();

  return (
    <>
      <h2>Oi, det skjedde noe feil</h2>
      <button onClick={() => router.push("/")}>Gå tilbake til forsiden</button>
    </>
  );
};
