import { useMutation } from "@apollo/client";
import { DELETE_USER_MEDIS } from "../graphql/mutation";

export default function useDeleteUser() {
  const [deleteUser, { loading: loadingDeleteUser }] =
    useMutation(DELETE_USER_MEDIS);

  return {
    deleteUser,
    loadingDeleteUser,
  };
}
