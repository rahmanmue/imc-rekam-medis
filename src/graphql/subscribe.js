import { gql } from "@apollo/client";

const SUBSCRIBE_USER = gql`
  subscription MySubscription {
    user_medis {
      id
      nama
      tanggal_lahir
      alamat
      no_rekam_medis
      user_role
    }
  }
`;

// subscribe berdisarkan no rekam user dan tanggal sekarang
const SUBSCRIBE_STATUS_ANTRIAN_USER = gql`
  subscription MySubscription($_eq: String = "", $_eq1: date = "") {
    antrian_medis(
      where: { no_rekam_medis: { _eq: $_eq }, tanggal: { _eq: $_eq1 } }
    ) {
      no_antrian
      status
    }
  }
`;

// Order sesuai tanggal
const SUBSCRIBE_ANTRIAN = gql`
  subscription MySubscription($_eq: date = "") {
    antrian_medis(where: { tanggal: { _eq: $_eq } }) {
      nama
      no_antrian
      no_rekam_medis
      status
      tanggal
      id
    }
  }
`;

// order sesuai tanggal
const SUBSCRIBE_NO_ANTRIAN_MAX_WHERE_DATE = gql`
  subscription MySubscription($_eq: date = "") {
    antrian_medis_aggregate(where: { tanggal: { _eq: $_eq } }) {
      aggregate {
        max {
          no_antrian
        }
      }
    }
  }
`;

const SUBSCRIBE_REKAM_MEDIS = gql`
  subscription MySubscription($_eq: uuid = "") {
    rekam_medis(where: { id_user: { _eq: $_eq } }) {
      alergi
      diagnosa
      keluhan
      nama
      pembayaran
      tanggal
      therapi
      id
      id_user
    }
  }
`;

export {
  SUBSCRIBE_ANTRIAN,
  SUBSCRIBE_NO_ANTRIAN_MAX_WHERE_DATE,
  SUBSCRIBE_USER,
  SUBSCRIBE_STATUS_ANTRIAN_USER,
  SUBSCRIBE_REKAM_MEDIS,
};
