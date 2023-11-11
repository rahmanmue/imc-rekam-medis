import { useNavigate, useParams } from "react-router-dom";
import { InputForm, Button } from "../../components";
import { useState } from "react";
import { useGetRekamMedisById, useUpdateRekamMedis } from "../../hooks";
import swal from "sweetalert";

function Index() {
  const navigate = useNavigate();
  const { id_user } = useParams();
  const { id_rekam_medis } = useParams();
  const { nama } = useParams();
  const tanggal = new Date().toISOString().split("T")[0];
  const { data: dataDetail, error } = useGetRekamMedisById(id_rekam_medis);
  if (error) console.error(error);
  // data diisi berdasarkan getuserby id
  const rekam_medis = dataDetail?.rekam_medis[0];
  // console.log(rekam_medis);

  const [data, setData] = useState({
    id: id_rekam_medis,
    id_user: id_user,
    nama: nama,
    tanggal: tanggal,
    alergi: rekam_medis?.alergi,
    keluhan: rekam_medis?.keluhan,
    diagnosa: rekam_medis?.diagnosa,
    therapi: rekam_medis?.therapi,
    pembayaran: rekam_medis?.pembayaran,
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const INPUTFORM = [
    {
      label: "Nama Pasien",
      name: "nama",
      type: "text",
      onChange: handleInputChange,
      disabled: true,
      value: data.nama,
    },
    {
      label: "Harga Pengobatan",
      name: "pembayaran",
      type: "number",
      placeholder: "Masukan Harga Pengobatan",
      onChange: handleInputChange,
      value: data.pembayaran,
    },
    {
      label: "Alergi",
      name: "alergi",
      type: "text",
      placeholder: "Masukan Alergi",
      onChange: handleInputChange,
      value: data.alergi,
    },
  ];

  const TEXTAREA = [
    {
      label: "Keluhan",
      name: "keluhan",
      placeholder: "Masukan Keluhan",
      onChange: handleInputChange,
      value: data.keluhan,
    },
    {
      label: "Diagnosa",
      name: "diagnosa",
      placeholder: "Masukan Diagnosa",
      onChange: handleInputChange,
      value: data.diagnosa,
    },
    {
      label: "Therapi",
      name: "therapi",
      placeholder: "Masukan Therapi",
      onChange: handleInputChange,
      value: data.therapi,
    },
  ];

  const { updateRekamMedis } = useUpdateRekamMedis();
  const handleEditCatatanMedis = (e) => {
    e.preventDefault();
    updateRekamMedis({
      variables: {
        _eq: id_rekam_medis,
        _set: data,
      },
    })
      .then(({ data }) => {
        const affected_rows = data.update_rekam_medis.affected_rows;
        if (affected_rows) {
          swal("Berhasil", "Data Berhasil DiEdit", "success", {
            button: true,
          });

          navigate(`/rekam-medis/${id_user}`);
        }
      })
      .catch((err) => console.error(err));
  };

  const propsButton = {
    name: "Selesai",
  };

  return (
    <>
      <div className="px-4 form-input">
        <h4 className="font-primary fw-bold text-dark-blue mb-3 mt-2 text-capitalize">
          Edit Catatan Medis
        </h4>
        <form onSubmit={handleEditCatatanMedis}>
          {INPUTFORM.map((props, i) => {
            return <InputForm props={props} key={i} />;
          })}
          {TEXTAREA.map((props, i) => {
            return <InputForm props={props} key={i} />;
          })}
          <Button props={propsButton} />
        </form>
      </div>
    </>
  );
}

export default Index;
