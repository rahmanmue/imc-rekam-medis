import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_ANTRIAN } from "../graphql/subscribe";

export default function useSubscribeAntrian() {
  let date = new Date().toISOString().split("T")[0];

  const {
    data: dataAntrian,
    loading: loadingAntrian,
    error: errorAntrian,
  } = useSubscription(SUBSCRIBE_ANTRIAN, {
    variables: {
      _eq: date,
    },
  });

  return {
    dataAntrian,
    loadingAntrian,
    errorAntrian,
  };
}
