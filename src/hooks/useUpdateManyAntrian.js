import { useMutation } from "@apollo/client";
import { UPDATE_MANY_ANTRIAN_MEDIS } from "../graphql/mutation";

export default function useUpdateManyAntrian() {
  const [updateManyAntrian, { loading: loadingUpdateAntrian }] = useMutation(
    UPDATE_MANY_ANTRIAN_MEDIS
  );

  return {
    updateManyAntrian,
    loadingUpdateAntrian,
  };
}
