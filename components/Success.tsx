import { useRouter } from "next/router";

export const Success = () => {
  const router = useRouter();
  return (
    <>
      <h2>Skjema er sendt inn</h2>
      <button onClick={() => router.push("/")}>Gå tilbake til forsiden</button>
    </>
  );
};
