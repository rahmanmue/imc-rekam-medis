import { useMutation } from "@apollo/client";
import { DELETE_REKAM_MEDIS } from "../graphql/mutation";

export default function useDeleteRekamMedis() {
  const [deleteRekamMedis, { loading: loadingDeleteRekamMedis }] =
    useMutation(DELETE_REKAM_MEDIS);

  return {
    deleteRekamMedis,
    loadingDeleteRekamMedis,
  };
}
