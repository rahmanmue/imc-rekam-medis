import { LayoutAccess } from "../../components";
import { coverLogin } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useGetUserByNoRekam } from "../../hooks";
import { hashStr, compareStr } from "../../utils";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  const navigate = useNavigate();

  const { error, refetch } = useGetUserByNoRekam();

  const [data, setData] = useState({
    no_rekam_medis: localStorage.getItem("no_rekam_medis") || "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState({
    password: "",
  });

  const [show, setShow] = useState(false);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const regexPassword = /^(?=.*\d)[a-zA-Z\d]{6,}$/;

    if (name === "password") {
      regexPassword.test(value) || value === " "
        ? setErrMsg({ ...errMsg, password: "" })
        : setErrMsg({
            ...errMsg,
            password:
              "Password minimal berisi 6 Karakter yang terdiri dari Angka dan Huruf",
          });
    }

    setData({
      ...data,
      [name]: value,
    });
  };

  if (error) console.error(error);

  const [loading, setLoading] = useState(false);

  const login = (id, inputPassword) => {
    setLoading(true);
    refetch({ _eq: id }).then(({ data }) => {
      const { user } = data;
      if (user.length) {
        const id = user[0]?.id;
        const password = user[0]?.password;
        const user_role = user[0]?.user_role;
        const no_rekam_medis = user[0]?.no_rekam_medis;

        // console.log(user);

        if (compareStr(inputPassword, password)) {
          localStorage.setItem("user_role", hashStr(user_role));
          localStorage.setItem("id", id);
          localStorage.setItem("no_rekam_medis", no_rekam_medis);
          navigate("/dashboard");
          setLoading(false);
        } else {
          setShow(true);
        }
      } else {
        setShow(true);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errMsg.password) {
      login(data.no_rekam_medis, data.password);
    } else {
      setShow(true);
    }
  };

  return (
    <LayoutAccess cover={coverLogin}>
      <div className="col-lg-6 side-right">
        <Link
          to="/"
          className="text-white rounded-pill bg-light-green font-primary py-2 px-3 fw-bold fs-5 shadow-btn"
        >
          Kembali
        </Link>

        <div className="d-flex flex-column justify-content-center gap-2 h-100">
          <div>
            <h2 className="font-primary fw-bold text-dark-blue">Masuk</h2>
            <p className="font-secondary text-dark-blue">
              Belum punya Akun? Daftar <Link to="/register">Disini</Link>
            </p>
          </div>

          <div>
            {show ? (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                <span className="font-primary">
                  No Rekam Medis atau Password Salah
                </span>
              </Alert>
            ) : (
              ""
            )}
          </div>

          <form>
            <div className="mb-3">
              <label
                htmlFor="norekammedis"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                No Rekam Medis
              </label>
              <input
                type="text"
                id="norekammedis"
                className="form-control"
                required
                name="no_rekam_medis"
                placeholder="Masukan No Rekam Medis"
                value={data.no_rekam_medis}
                onChange={handleInputChange}
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
                id="password"
                className="form-control"
                placeholder="Masukan Password"
                required
                name="password"
                value={data.password}
                onChange={handleInputChange}
              />
              <div id="password" className="form-text text-danger">
                {errMsg.password ? errMsg.password : " "}
              </div>
            </div>

            <div className="my-4 font-secondary text-dark-blue">
              <p>
                Lupa kata sandi? <a href="">Klik hubungi admin</a>
              </p>

              <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-1  text-white font-primary fs-5 fw-bold col-12 py-2  border-0 
        shadow-btn bg-primary-green"
              >
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Masuk"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAccess>
  );
}

export default Login;
