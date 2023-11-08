import { useMutation } from "@apollo/client";
import { UPDATE_FINISH_MEDIS } from "../graphql/mutation";

export default function useFinishMedis() {
  const [updateFinishMedis, { loading: loadingFinishMedis }] =
    useMutation(UPDATE_FINISH_MEDIS);

  return {
    updateFinishMedis,
    loadingFinishMedis,
  };
}
