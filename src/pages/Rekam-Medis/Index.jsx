import DataTable from "react-data-table-component";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import {
  customStyles,
  paginationComponentOptions,
  toRupiah,
} from "../../utils";
import { useState, useMemo } from "react";
import swal from "sweetalert";
import { getAge } from "../../utils";
import { Link, useParams } from "react-router-dom";
import {
  useGetUserByPk,
  useSubscribeRekamMedis,
  useDeleteRekamMedis,
} from "../../hooks";
import { Loading } from "../../components";
import { isRole } from "../../utils";

function Index() {
  const { uuid } = useParams();
  const { data: user_medis, error: errorUser } = useGetUserByPk(uuid);
  const data = user_medis?.user_medis_by_pk;
  if (errorUser) console.error(errorUser);

  const user = isRole(localStorage.getItem("user_role"));
  // const user = "pasien";
  // ambil detail rekam medis pasien berdasarkna id
  const {
    data: list_rekam_medis,
    loading: loading_rekam_medis,
    error: err_rekam_medis,
  } = useSubscribeRekamMedis(uuid);
  if (err_rekam_medis) console.error(err_rekam_medis);

  const listRekamMedis = list_rekam_medis?.rekam_medis;
  // console.log(listRekamMedis);

  const { deleteRekamMedis } = useDeleteRekamMedis();

  const handleHapus = (id) => {
    swal({
      title: "Apakah kamu yakin?",
      text: "Data yang dihapus tidak bisa dipulihkan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteRekamMedis({
          variables: {
            _eq: id,
          },
        })
          .then(({ data }) => {
            const affected_rows = data.delete_rekam_medis.affected_rows;
            if (affected_rows) {
              swal("Data Berhasil Dihapus!", {
                icon: "success",
              });
            }
          })
          .catch((err) => console.error(err));
        // console.log(id);
      } else {
        swal("Data Tidak Dihapus!");
      }
    });
  };

  let columnsRekamMedis = [];
  if (user === "admin") {
    columnsRekamMedis = [
      {
        name: "Tanggal",
        selector: (row) => row.tanggal,
        sortable: true,
      },
      {
        name: "Alergi",
        selector: (row) => row.alergi,
      },
      {
        name: "Keluhan",
        selector: (row) => row.keluhan,
      },
      {
        name: "Diagnosa",
        selector: (row) => row.diagnosa,
      },
      {
        name: "Therapi",
        selector: (row) => row.therapi,
      },
      {
        name: "Pembayaran",
        selector: (row) => toRupiah(row.pembayaran),
      },
      {
        name: "Hapus",
        center: true,
        cell: (row) => (
          <div className="d-flex gap-3">
            <BsFillTrashFill
              className="text-danger fs-4 pointer"
              onClick={() => handleHapus(row.id)}
            />
          </div>
        ),
      },
    ];
  } else if (user === "dokter") {
    columnsRekamMedis = [
      {
        name: "Tanggal",
        selector: (row) => row.tanggal,
        sortable: true,
      },
      {
        name: "Alergi",
        selector: (row) => row.alergi,
      },
      {
        name: "Keluhan",
        selector: (row) => row.keluhan,
      },
      {
        name: "Diagnosa",
        selector: (row) => row.diagnosa,
      },
      {
        name: "Therapi",
        selector: (row) => row.therapi,
      },
      {
        name: "Pembayaran",
        selector: (row) => toRupiah(row.pembayaran),
      },
      {
        name: "Edit",
        center: true,
        cell: (row) => (
          <div className="d-flex gap-3">
            <Link to={`/rekam-medis/edit/${data?.nama}/${row.id}/${row.uuid}`}>
              <FaEdit className="text-warning fs-4 pointer" />
            </Link>
          </div>
        ),
      },
    ];
  } else if (user === "pasien") {
    columnsRekamMedis = [
      {
        name: "Tanggal",
        selector: (row) => row.tanggal,
        sortable: true,
      },

      {
        name: "Alergi",
        selector: (row) => row.alergi,
      },
      {
        name: "Keluhan",
        selector: (row) => row.keluhan,
      },
      {
        name: "Diagnosa",
        selector: (row) => row.diagnosa,
      },
      {
        name: "Therapi",
        selector: (row) => row.therapi,
      },
      {
        name: "Pembayaran",
        selector: (row) => toRupiah(row.pembayaran),
      },
    ];
  }

  return (
    <>
      <div className="ps-3 font-primary">
        <h4 className="mt-4 fw-bold">Catatan Rekam Medis</h4>
        <table className="my-3 fs-5">
          <tbody>
            <tr>
              <td width={"100px"} className="fw-medium">
                Nama
              </td>
              <td width={"15px"}>:</td>
              <td className="text-capitalize">{data?.nama || ""}</td>
            </tr>
            <tr>
              <td className="fw-medium">Umur</td>
              <td>:</td>
              <td>{getAge(data?.tanggal_lahir || "")}</td>
            </tr>
            <tr>
              <td className="fw-medium">Alamat</td>
              <td>:</td>
              <td className=" text-capitalize">{data?.alamat || ""}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {user === "dokter" ? (
        <div className="mb-4 d-flex justify-content-end pe-4">
          <Link
            className="bg-primary-green text-white p-2 font-primary fw-bold fs-5 rounded d-flex align-items-center gap-2"
            to={`/rekam-medis/tambah/${data?.nama}/${uuid}`}
          >
            <AiOutlinePlus className="fs-4" /> Tambah
          </Link>
        </div>
      ) : (
        ""
      )}

      <div className="px-2">
        {loading_rekam_medis ? (
          <Loading />
        ) : (
          <DataTable
            striped={true}
            columns={columnsRekamMedis}
            data={listRekamMedis}
            customStyles={customStyles}
            pagination
            paginationComponentOptions={paginationComponentOptions}
          />
        )}
      </div>
    </>
  );
}

export default Index;
