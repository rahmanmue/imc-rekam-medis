import { LayoutAccess } from "../../components";
import { coverRegister } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useInsertUser } from "../../hooks";
import { hashStr } from "../../utils";
import Spinner from "react-bootstrap/Spinner";

function Register() {
  const navigate = useNavigate();

  const { insertUser, loadingInsertUser } = useInsertUser();

  const [data, setData] = useState({
    nama: "",
    no_rekam_medis: "",
    alamat: "",
    tanggal_lahir: "",
    password: "",
    confirm_password: "",
  });

  const [errMsg, setErrMsg] = useState({
    nama: "",
    password: "",
    confirm_password: "",
    no_rekam_medis: "No. Rekam Medis Masih Kosong",
  });

  const generateNoRekamMedis = () => {
    const no_rekam = uuidv4().split("-")[0];
    setData({ ...data, no_rekam_medis: no_rekam });
    setErrMsg({ ...errMsg, no_rekam_medis: "" });
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const regexNama = /^[A-Za-z ]*$/;
    const regexPassword = /^(?=.*\d)[a-zA-Z\d]{6,}$/;

    if (name === "nama") {
      regexNama.test(value) || value === " "
        ? setErrMsg({ ...errMsg, nama: "" })
        : setErrMsg({ ...errMsg, nama: "Nama Harus Berupa Huruf" });
    } else if (name === "password") {
      regexPassword.test(value) || value === " "
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
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const objects = {
      nama: data.nama,
      alamat: data.alamat,
      tanggal_lahir: data.tanggal_lahir,
      no_rekam_medis: data.no_rekam_medis,
      password: hashStr(data.password),
    };

    if (
      !errMsg.nama &&
      !errMsg.password &&
      !errMsg.confirm_password &&
      !errMsg.no_rekam_medis
    ) {
      setLoading(true);
      insertUser({
        variables: {
          objects: objects,
        },
      })
        .then((Object) => {
          const isObj = Object.data.insert_user_medis;
          if (isObj.affected_rows) {
            const { no_rekam_medis } = isObj.returning[0];
            localStorage.setItem("no_rekam_medis", no_rekam_medis);
            setData({
              nama: "",
              no_rekam_medis: "",
              alamat: "",
              tanggal_lahir: "",
              password: "",
              confirm_password: "",
            });
            navigate("/login");
            setLoading(false);
          }
        })
        .catch((err) => console.error(err));
    } else {
      alert("Harap isi data anda dengan Benar");
    }
  };

  return (
    <LayoutAccess cover={coverRegister}>
      <div className="col-lg-6 col-sm-12 side-right">
        <Link
          to="/"
          className="text-white rounded-pill bg-light-green font-primary py-2 px-3 fw-bold fs-5 shadow-btn"
        >
          Kembali
        </Link>

        <div className="d-flex flex-column justify-content-center gap-2 h-100 mb-5">
          <h2 className="font-primary fw-bold text-dark-blue">Daftar Akun</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="nama"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                Nama
              </label>
              <input
                type="text"
                className="form-control"
                id="nama"
                name="nama"
                onChange={handleInputChange}
                placeholder="Masukan Nama"
                required
              />
            </div>
            <div className="form-text text-danger">
              {errMsg.nama ? errMsg.nama : " "}
            </div>
            <div className="  mb-3">
              <label
                htmlFor="no_rekam_medis"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                No. Rekam Medis{" "}
                <span className="text-primary">
                  (Harap ingat dan isi No rekam Medis Anda)
                </span>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="no_rekam_medis"
                  name="no_rekam_medis"
                  className="form-control "
                  disabled={true}
                  required
                  value={data.no_rekam_medis || ""}
                />
                <span
                  className="input-group-text cursor-pointer font-primary bg-light-green text-white"
                  onClick={() => generateNoRekamMedis()}
                >
                  Klik Disini
                </span>
              </div>
              <div className="form-text text-danger">
                {errMsg.no_rekam_medis ? errMsg.no_rekam_medis : " "}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="alamat"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                Alamat
              </label>
              <input
                type="text"
                className="form-control"
                id="alamat"
                name="alamat"
                onChange={handleInputChange}
                placeholder="Masukan Alamat"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="tanggal_lahir"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                Tanggal lahir
              </label>
              <input
                type="date"
                className="form-control"
                id="tanggal_lahir"
                name="tanggal_lahir"
                placeholder="Masukan Tanggal Lahir"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Masukan Password"
                onChange={handleInputChange}
                required
              />
              <div className="form-text text-danger">
                {errMsg.password ? errMsg.password : " "}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="confirm_password"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                className="form-control"
                placeholder="Konfirmasi Password"
                onChange={handleInputChange}
                required
              />

              <div className="form-text text-danger">
                {errMsg.confirm_password ? errMsg.confirm_password : " "}
              </div>
            </div>

            <button
              type="submit"
              className="rounded-1 bg-primary-green text-white font-primary fs-6 fw-bold col-12 py-2 shadow-btn border-0 my-4"
            >
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Daftar"
              )}
            </button>
          </form>
        </div>
      </div>
    </LayoutAccess>
  );
}

export default Register;
