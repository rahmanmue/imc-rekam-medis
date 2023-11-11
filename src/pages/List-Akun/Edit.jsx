import { useNavigate, useParams } from "react-router-dom";
import { InputForm, Button, Select } from "../../components";
import { useEffect, useState } from "react";
import { useGetUserByPk, useUpdateUserById } from "../../hooks";
import { hashStr } from "../../utils";

function Index() {
  const { id_user } = useParams();
  const navigate = useNavigate();
  const { data: dataUser, loading, error } = useGetUserByPk(id_user);
  const { updateUserById } = useUpdateUserById();

  // data diisi berdasarkan getuserby id
  const [data, setData] = useState({
    id: "",
    nama: "",
    alamat: "",
    tanggal_lahir: "",
    user_role: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (dataUser) {
      setData({
        ...data,
        id: dataUser?.user_medis_by_pk?.id,
        nama: dataUser?.user_medis_by_pk?.nama,
        alamat: dataUser?.user_medis_by_pk?.alamat,
        tanggal_lahir: dataUser?.user_medis_by_pk?.tanggal_lahir,
        user_role: dataUser?.user_medis_by_pk?.user_role,
      });
    }
  }, [dataUser]);

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

  const updateUser = (id_user, newData) => {
    updateUserById({
      variables: {
        _eq: id_user,
        _set: newData,
      },
    })
      .then(({ data }) => {
        const affected_rows = data.update_user_medis.affected_rows;
        if (affected_rows) {
          swal("Berhasil", "Data Berhasil Diedit", "success", {
            button: true,
          });

          navigate("/list-akun");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleEditAkun = (e) => {
    e.preventDefault();
    // update akun saya
    if (!errMsg.nama && !errMsg.password && !errMsg.confirm_password) {
      let newData = {};
      if (data.password === "") {
        newData = {
          nama: data.nama,
          alamat: data.alamat,
          tanggal_lahir: data.tanggal_lahir,
          user_role: data.user_role,
        };
      } else {
        newData = {
          nama: data.nama,
          alamat: data.alamat,
          tanggal_lahir: data.tanggal_lahir,
          password: hashStr(data.password),
          user_role: data.user_role,
        };
      }

      // console.log(newData);
      // console.log(id);

      updateUser(id_user, newData);
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

  const propsSelect = {
    label: "Status Akun",
    name: "user_role",
    value: data.user_role,
    options: [
      {
        value: "admin",
      },
      {
        value: "dokter",
      },
      {
        value: "pasien",
      },
    ],
    onChange: (e) =>
      setData({
        ...data,
        user_role: e.target.value,
      }),
  };

  const propsButton = {
    name: "Edit Data",
    onClick: handleEditAkun,
  };

  return (
    <>
      <div className="px-4 form-input">
        <form>
          {INPUTFORM.map((props, i) => {
            return <InputForm props={props} key={i} />;
          })}
          <Select props={propsSelect} />
          <Button props={propsButton} />
        </form>
      </div>
    </>
  );
}

export default Index;
