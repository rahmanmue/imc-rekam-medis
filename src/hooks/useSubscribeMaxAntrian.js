import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_NO_ANTRIAN_MAX_WHERE_DATE } from "../graphql/subscribe";

export default function useSubscribeMaxAntrian() {
  let date = new Date().toISOString().split("T")[0];

  const {
    data: maxAntrian,
    loading: loadingMaxAntrian,
    error: errorMaxAntrian,
  } = useSubscription(SUBSCRIBE_NO_ANTRIAN_MAX_WHERE_DATE, {
    variables: {
      _eq: date,
    },
  });

  return {
    maxAntrian,
    loadingMaxAntrian,
    errorMaxAntrian,
  };
}
