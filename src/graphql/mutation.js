import { gql } from "@apollo/client";

const INSERT_USER = gql`
  mutation MyMutation($objects: [user_insert_input!] = {}) {
    insert_user(objects: $objects) {
      affected_rows
      returning {
        no_rekam_medis
      }
    }
  }
`;

export { INSERT_USER };
