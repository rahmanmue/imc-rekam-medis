import { gql } from "@apollo/client";

const GET_USER_BY_NO_REKAM = gql`
  query MyQuery($_eq: String = "") @cached {
    user_medis(where: { no_rekam_medis: { _eq: $_eq } }) {
      id
      nama
      no_rekam_medis
      password
      user_role
      tanggal_lahir
      alamat
    }
  }
`;

const GET_USER_BY_PK = gql`
  query MyQuery($id: uuid = "") @cached {
    user_medis_by_pk(id: $id) {
      id
      nama
      user_role
      tanggal_lahir
      alamat
      user_role
    }
  }
`;

const GET_REKAM_MEDIS_BY_ID = gql`
  query MyQuery($_eq: Int = "") {
    rekam_medis(where: { id: { _eq: $_eq } }) {
      alergi
      diagnosa
      id
      keluhan
      nama
      pembayaran
      tanggal
      therapi
      uuid
    }
  }
`;

export { GET_USER_BY_NO_REKAM, GET_USER_BY_PK, GET_REKAM_MEDIS_BY_ID };
