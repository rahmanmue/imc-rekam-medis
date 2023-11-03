import { gql } from "@apollo/client";

const GET_USER_BY_NO_REKAM = gql`
  query MyQuery($_eq: String = "") @cached {
    user(where: { no_rekam_medis: { _eq: $_eq } }) {
      id
      no_rekam_medis
      password
      user_role
    }
  }
`;

const GET_USER_BY_PK = gql`
  query MyQuery($id: uuid = "") @cached {
    user_by_pk(id: $id) {
      user_role
    }
  }
`;

export { GET_USER_BY_NO_REKAM, GET_USER_BY_PK };
