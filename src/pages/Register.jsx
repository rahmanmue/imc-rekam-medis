import { LayoutAccess } from "../components";
import { coverRegister } from "../assets";

function Register() {
  return (
    <LayoutAccess cover={coverRegister}>
      <div className="col-lg-6 col-sm-12 side-right">
        <a
          href="index.html"
          className="text-white rounded-pill bg-light-green font-primary py-2 px-3 fw-bold fs-5 shadow-btn"
        >
          Kembali
        </a>

        <div className="d-flex flex-column justify-content-center gap-2 h-100 mb-5">
          <h2 className="font-primary fw-bold text-dark-blue">Daftar Akun</h2>

          <form>
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
                placeholder="Masukan Nama"
                required
              />
            </div>
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
                htmlFor="alamat"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                Alamat
              </label>
              <input
                type="text"
                className="form-control"
                id="alamat"
                placeholder="Masukan Alamat"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="tanggal-lahir"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                Tanggal lahir
              </label>
              <input
                type="date"
                className="form-control"
                id="tanggal-lahir"
                placeholder="Masukan Tanggal Lahir"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="pekerjaan"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                Pekerjaan
              </label>
              <input
                type="text"
                className="form-control"
                id="pekerjaan"
                placeholder="Masukan Pekerjaan"
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
                placeholder="Masukan Password"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="confirm-password"
                className="form-label font-primary fw-bold text-dark-blue fs-6"
              >
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="form-control"
                placeholder="Konfirmasi Password"
                required
              />
              <div id="confirm-password" className="form-text">
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </div>
            </div>

            <button
              type="submit"
              className="rounded-1 bg-primary-green text-white font-primary fs-6 fw-bold col-12 py-2 shadow-btn border-0 my-4"
            >
              Daftar
            </button>
          </form>
        </div>
      </div>
    </LayoutAccess>
  );
}

export default Register;
