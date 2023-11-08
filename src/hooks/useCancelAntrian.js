import { useMutation } from "@apollo/client";
import { UPDATE_CANCEL_ANTRIAN_MEDIS } from "../graphql/mutation";

export default function useCancelAntrian() {
  const [updateCancelAntrian, { loading: loadingCancelAntrian }] = useMutation(
    UPDATE_CANCEL_ANTRIAN_MEDIS
  );

  return {
    updateCancelAntrian,
    loadingCancelAntrian,
  };
}
