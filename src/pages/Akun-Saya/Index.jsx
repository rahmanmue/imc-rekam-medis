import { InputForm, Button } from "../../components";
import { useState } from "react";
import { hashStr } from "../../utils";
import { useUpdateUserById } from "../../hooks";
import swal from "sweetalert";
import { Loading } from "../../components";

function Index() {
  const { updateUserById, loadingUpdateUserById } = useUpdateUserById();

  // data diisi berdasarkan user localstorage
  const [data, setData] = useState({
    id: localStorage.getItem("id"),
    nama: localStorage.getItem("nama"),
    no_rekam_medis: localStorage.getItem("no_rekam_medis"),
    alamat: localStorage.getItem("alamat"),
    tanggal_lahir: localStorage.getItem("tanggal_lahir"),
    password: "",
    confirm_password: "",
  });

  const [errMsg, setErrMsg] = useState({
    nama: "",
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const regexNama = /^[A-Za-z ]*$/;
    const regexPassword = /^(?=.*\d)[a-zA-Z\d]{6,}$/;

    if (name === "nama") {
      regexNama.test(value)
        ? setErrMsg({ ...errMsg, nama: "" })
        : setErrMsg({ ...errMsg, nama: "Nama Harus Berupa Huruf" });
    } else if (name === "password") {
      regexPassword.test(value)
        ? setErrMsg({ ...errMsg, password: "" })
        : setErrMsg({
            ...errMsg,
            password:
              "Password minimal berisi 6 Karakter yang terdiri dari Angka dan Huruf",
          });
    } else if (name === "confirm_password") {
      value !== data.password
        ? setErrMsg({
            ...errMsg,
            confirm_password: "Konfirmasi Password tidak sama dengan Password",
          })
        : setErrMsg({ ...errMsg, confirm_password: "" });
    }
    setData({
      ...data,
      [name]: value,
    });
  };

  const INPUTFORM = [
    {
      label: "Nama",
      name: "nama",
      type: "text",
      placeholder: "Masukan Nama",
      onChange: handleInputChange,
      errMsg: errMsg.nama,
      value: data.nama,
    },
    {
      label: "No. Rekam Medis",
      name: "no_rekam_medis",
      type: "text",
      onChange: handleInputChange,
      disabled: true,
      value: data.no_rekam_medis,
    },
    {
      label: "Tanggal Lahir",
      name: "tanggal_lahir",
      type: "date",
      placeholder: "Masukan Tanggal Lahir",
      onChange: handleInputChange,
      value: data.tanggal_lahir,
    },
    {
      label: "Alamat",
      name: "alamat",
      type: "text",
      placeholder: "Masukan Alamat",
      onChange: handleInputChange,
      value: data.alamat,
    },
    {
      label: "Password Baru",
      name: "password",
      type: "password",
      placeholder: "Masukan Password Baru",
      onChange: handleInputChange,
      value: data.password,
      errMsg: errMsg.password,
    },
    {
      label: "Konfirmasi Password",
      name: "confirm_password",
      type: "password",
      placeholder: "Masukan Konfirmasi Password",
      onChange: handleInputChange,
      value: data.confirm_password,
      errMsg: errMsg.confirm_password,
    },
  ];

  const updateUser = (id, newData) => {
    updateUserById({
      variables: {
        _eq: id,
        _set: newData,
      },
    })
      .then(({ data }) => {
        const affected_rows = data.update_user_medis?.affected_rows;
        // console.log(affected_rows);
        if (affected_rows) {
          localStorage.setItem("nama", newData.nama);
          localStorage.setItem("alamat", newData.alamat);
          localStorage.setItem("tanggal_lahir", newData.tanggal_lahir);

          swal("Berhasil", "Data Berhasil Diedit", "success", {
            button: true,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // update akun saya
    if (!errMsg.nama && !errMsg.password && !errMsg.confirm_password) {
      let newData = {};
      let id = data.id;
      if (data.password === "") {
        newData = {
          nama: data.nama,
          alamat: data.alamat,
          tanggal_lahir: data.tanggal_lahir,
        };
      } else {
        newData = {
          nama: data.nama,
          alamat: data.alamat,
          tanggal_lahir: data.tanggal_lahir,
          password: hashStr(data.password),
        };
      }

      updateUser(id, newData);
    } else {
      // swal gagal
      swal(
        "Perhatian!",
        "Beberapa Form Belum Terisi dengan Benar!",
        "warning",
        {
          button: true,
        }
      );
    }
  };

  const propsButton = {
    name: "Edit Data",
    onClick: handleEdit,
  };

  if (loadingUpdateUserById) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="px-4 form-input">
          <form>
            {INPUTFORM.map((props, i) => {
              return <InputForm props={props} key={i} />;
            })}
            <Button props={propsButton} />
          </form>
        </div>
      </>
    );
  }
}

export default Index;
