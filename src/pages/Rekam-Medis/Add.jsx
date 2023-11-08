import { useNavigate, useParams } from "react-router-dom";
import { InputForm, Button } from "../../components";
import { useState } from "react";
import { useInsertRekamMedis } from "../../hooks";
import swal from "sweetalert";

function Index() {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const { nama } = useParams();
  const tanggal = new Date().toISOString().split("T")[0];
  const baseData = {
    uuid: uuid,
    nama: nama,
    tanggal: tanggal,
    alergi: "",
    keluhan: "",
    diagnosa: "",
    therapi: "",
    pembayaran: "",
  };

  // data diisi berdasarkan getuserby id
  const [data, setData] = useState(baseData);
  const { insertRekamMedis } = useInsertRekamMedis();

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

  const handleAddCatatanMedis = (e) => {
    e.preventDefault();
    insertRekamMedis({
      variables: {
        objects: data,
      },
    })
      .then(({ data }) => {
        const affected_rows = data.insert_rekam_medis.affected_rows;
        if (affected_rows) {
          swal("Berhasil", "Data Berhasil Ditambahkan", "success", {
            button: true,
          });

          navigate(`/rekam-medis/${uuid}`);
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
          Tambah Catatan Medis
        </h4>
        <form onSubmit={handleAddCatatanMedis}>
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
