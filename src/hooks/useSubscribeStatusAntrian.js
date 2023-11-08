import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_STATUS_ANTRIAN_USER } from "../graphql/subscribe";

export default function useSubscribeStatusAntrian(no_rekam_medis) {
  let dateNow = new Date().toISOString().split("T")[0];
  const {
    data: dataStatusAntrian,
    loading: loadingStatusAntrian,
    error: errorStatusAntrian,
  } = useSubscription(SUBSCRIBE_STATUS_ANTRIAN_USER, {
    variables: {
      _eq: no_rekam_medis,
      _eq1: dateNow,
    },
  });

  return {
    dataStatusAntrian,
    loadingStatusAntrian,
    errorStatusAntrian,
  };
}
