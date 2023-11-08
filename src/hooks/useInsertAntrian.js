import { useMutation } from "@apollo/client";
import { INSERT_ANTRIAN_MEDIS } from "../graphql/mutation";

export default function useInsertAntrian() {
  const [insertAntrian, { loading: loadingInsertAntrian }] =
    useMutation(INSERT_ANTRIAN_MEDIS);

  return {
    insertAntrian,
    loadingInsertAntrian,
  };
}
