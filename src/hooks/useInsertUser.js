import { useMutation } from "@apollo/client";
import { INSERT_USER } from "../graphql/mutation";

export default function useInsertUser() {
  const [insertUser, { loading: loadingInsertUser }] = useMutation(INSERT_USER);

  return {
    insertUser,
    loadingInsertUser,
  };
}
