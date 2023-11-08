import { useMutation } from "@apollo/client";
import { INSERT_REKAM_MEDIS } from "../graphql/mutation";

export default function useInsertRekamMedis() {
  const [insertRekamMedis, { loading: loadingInsertRekamMedis }] =
    useMutation(INSERT_REKAM_MEDIS);

  return {
    insertRekamMedis,
    loadingInsertRekamMedis,
  };
}
