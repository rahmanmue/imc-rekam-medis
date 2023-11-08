import { gql } from "@apollo/client";

const INSERT_USER = gql`
  mutation MyMutation($objects: [user_medis_insert_input!] = {}) {
    insert_user_medis(objects: $objects) {
      affected_rows
      returning {
        no_rekam_medis
      }
    }
  }
`;

const UPDATE_USER_BY_ID = gql`
  mutation MyMutation($_set: user_medis_set_input = {}, $_eq: uuid = "") {
    update_user_medis(where: { id: { _eq: $_eq } }, _set: $_set) {
      affected_rows
    }
  }
`;

const INSERT_ANTRIAN_MEDIS = gql`
  mutation MyMutation($objects: [antrian_medis_insert_input!] = {}) {
    insert_antrian_medis(objects: $objects) {
      affected_rows
    }
  }
`;

const UPDATE_ANTRIAN_MEDIS = gql`
  mutation MyMutation($_eq: String = "") {
    update_antrian_medis(
      where: { no_rekam_medis: { _eq: $_eq } }
      _set: { status: "menunggu" }
    ) {
      affected_rows
    }
  }
`;

const UPDATE_MANY_ANTRIAN_MEDIS = gql`
  mutation MyMutation($objects: [antrian_medis_insert_input!] = {}) {
    insert_antrian_medis(
      objects: $objects
      on_conflict: {
        constraint: antrian_medis_pkey
        update_columns: [no_antrian, status]
      }
    ) {
      affected_rows
    }
  }
`;

const UPDATE_CANCEL_ANTRIAN_MEDIS = gql`
  mutation MyMutation($_eq: String = "") {
    update_antrian_medis(
      where: { no_rekam_medis: { _eq: $_eq } }
      _set: { status: "ditolak" }
    ) {
      affected_rows
    }
  }
`;

const UPDATE_FINISH_MEDIS = gql`
  mutation MyMutation($_eq: String = "") {
    update_antrian_medis(
      where: { no_rekam_medis: { _eq: $_eq } }
      _set: { status: "diperiksa" }
    ) {
      affected_rows
    }
  }
`;

const INSERT_REKAM_MEDIS = gql`
  mutation MyMutation($objects: [rekam_medis_insert_input!] = {}) {
    insert_rekam_medis(objects: $objects) {
      affected_rows
    }
  }
`;

const UPDATE_REKAM_MEDIS = gql`
  mutation MyMutation($_set: rekam_medis_set_input = {}, $_eq: Int = "") {
    update_rekam_medis(where: { id: { _eq: $_eq } }, _set: $_set) {
      affected_rows
    }
  }
`;

const DELETE_REKAM_MEDIS = gql`
  mutation MyMutation($_eq: Int = "") {
    delete_rekam_medis(where: { id: { _eq: $_eq } }) {
      affected_rows
    }
  }
`;

const DELETE_USER_MEDIS = gql`
  mutation MyMutation($_eq: uuid = "") {
    delete_user_medis(where: { id: { _eq: $_eq } }) {
      affected_rows
    }
  }
`;

export {
  INSERT_USER,
  INSERT_ANTRIAN_MEDIS,
  UPDATE_MANY_ANTRIAN_MEDIS,
  UPDATE_CANCEL_ANTRIAN_MEDIS,
  UPDATE_FINISH_MEDIS,
  UPDATE_USER_BY_ID,
  UPDATE_ANTRIAN_MEDIS,
  INSERT_REKAM_MEDIS,
  UPDATE_REKAM_MEDIS,
  DELETE_REKAM_MEDIS,
  DELETE_USER_MEDIS,
};
