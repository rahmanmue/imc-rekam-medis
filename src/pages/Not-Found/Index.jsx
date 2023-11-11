import { LayoutFront } from "../../components";
import { notFoundImage } from "../../assets";
import { Link } from "react-router-dom";

function Index() {
  return (
    <LayoutFront>
      <div className="container">
        <div className="d-flex justify-content-center my-5 flex-column align-items-center">
          <img
            src={notFoundImage}
            alt="not-found"
            className="img-fluid col-4"
          />
          <div className="font-primary text-dark-blue fs-2 mt-5">
            <span className="fw-bold">404</span> Halaman Tidak Ditemukan, Klik{" "}
            <Link to="/" className="fw-bold text-primary-green">
              Disini
            </Link>{" "}
            untuk Kembali
          </div>
        </div>
      </div>
    </LayoutFront>
  );
}

export default Index;
