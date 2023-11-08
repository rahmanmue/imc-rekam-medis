import { useMutation } from "@apollo/client";
import { UPDATE_REKAM_MEDIS } from "../graphql/mutation";

export default function useUpdateRekamMedis() {
  const [updateRekamMedis, { loading }] = useMutation(UPDATE_REKAM_MEDIS);

  return {
    updateRekamMedis,
    loading,
  };
}
