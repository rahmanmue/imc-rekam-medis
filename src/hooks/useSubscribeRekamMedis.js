import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_REKAM_MEDIS } from "../graphql/subscribe";

export default function useSubscribeRekamMedis(uuid) {
  const { data, loading, error } = useSubscription(SUBSCRIBE_REKAM_MEDIS, {
    variables: {
      _eq: uuid,
    },
  });

  return {
    data,
    loading,
    error,
  };
}
