import { useQuery } from "@apollo/client";
import { GET_REKAM_MEDIS_BY_ID } from "../graphql/query";

export default function useGetRekamMedisById(id) {
  const { data, error } = useQuery(GET_REKAM_MEDIS_BY_ID, {
    variables: {
      _eq: id,
    },
    awaitRefetchQueries: true,
  });
  return {
    data,
    error,
  };
}
