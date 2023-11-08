import { useMutation } from "@apollo/client";
import { UPDATE_ANTRIAN_MEDIS } from "../graphql/mutation";

export default function useUpdateAntrian() {
  const [updateAntrian, { loading }] = useMutation(UPDATE_ANTRIAN_MEDIS);

  return {
    updateAntrian,
    loading,
  };
}
