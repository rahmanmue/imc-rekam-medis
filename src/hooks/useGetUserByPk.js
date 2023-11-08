import { useQuery } from "@apollo/client";
import { GET_USER_BY_PK } from "../graphql/query";

export default function useGetUserByPk(id) {
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_PK, {
    variables: {
      id: id,
    },
    awaitRefetchQueries: true,
  });
  return {
    loading,
    error,
    data,
    refetch,
  };
}
