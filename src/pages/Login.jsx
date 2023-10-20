import { LayoutAccess } from "../components";
import { coverLogin } from "../assets";

function Login() {
  return (
    <LayoutAccess cover={coverLogin}>
      <div className="col-lg-6 side-right">
        <a
          href="index.html"
          className="text-white rounded-pill bg-light-green font-primary py-2 px-3 fw-bold fs-5 shadow-btn"
        >
          Kembali
        </a>

        <div className="d-flex flex-column justify-content-center gap-2 h-100">
          <div>
            <h2 className="font-primary fw-bold text-dark-blue">Masuk</h2>
            <p className="font-secondary text-dark-blue">
              Belum punya Akun? Daftar <a href="register.html">Disini</a>
            </p>
          </div>

          <form>
            <div className="mb-3">
              <label
                htmlFor="notelp"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                No Telp
              </label>
              <input
                type="tel"
                id="notelp"
                className="form-control"
                pattern="(08)[0-9]{8,10}"
                required
                placeholder="Cth. 083899997878"
              />
              <div id="password" className="form-text">
                Nomor telepon salah
              </div>
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
              />
              <div id="password" className="form-text">
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </div>
            </div>

            <div className="my-4 font-secondary text-dark-blue">
              <p>
                Lupa kata sandi? <a href="">Klik hubungi admin</a>
              </p>
              <button
                type="submit"
                className="rounded-1 bg-primary-green text-white font-primary fs-5 fw-bold col-12 py-2 shadow-btn border-0"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAccess>
  );
}

export default Login;
