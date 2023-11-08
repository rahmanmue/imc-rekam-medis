import { useMutation } from "@apollo/client";
import { UPDATE_USER_BY_ID } from "../graphql/mutation";

export default function useUpdateUserById() {
  const [updateUserById, { loading: loadingUpdateUserById }] =
    useMutation(UPDATE_USER_BY_ID);

  return {
    updateUserById,
    loadingUpdateUserById,
  };
}
