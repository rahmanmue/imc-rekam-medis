import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_USER } from "../graphql/subscribe";

export default function useSubscribeUser() {
  const {
    data: dataUser,
    loading: loadingUser,
    error: errorUser,
  } = useSubscription(SUBSCRIBE_USER);

  return {
    dataUser,
    loadingUser,
    errorUser,
  };
}
