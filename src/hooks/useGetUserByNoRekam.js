import { useQuery } from "@apollo/client";
import { GET_USER_BY_NO_REKAM } from "../graphql/query";

export function useGetUserByNoRekam(no_rekam_medis) {
  const { error, refetch } = useQuery(GET_USER_BY_NO_REKAM, {
    variables: {
      _eq: no_rekam_medis,
    },
    awaitRefetchQueries: true,
  });
  return {
    error,
    refetch,
  };
}
