function LayoutFront({ children, logo }) {
  const year = new Date().getFullYear();
  return (
    <>
      <nav className="navbar navbar-expand-lg py-3 bg-primary-green font-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-bold fs-5">
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  aria-current="page"
                  href="#hero"
                >
                  Beranda
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#info">
                  Tentang Kami
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#contact">
                  Kontak
                </a>
              </li>
            </ul>
            <div className="flex-content align-items-center gap-3">
              <a
                href="register.html"
                className="pe-lg-3 text-white fw-bold fs-5"
              >
                Daftar
              </a>
              <a
                href="login.html"
                className="bg-light-green text-white fw-bold fs-5 rounded-pill w-100 py-2 px-4 text-center"
              >
                Masuk
              </a>
            </div>
          </div>
        </div>
      </nav>

      {children}

      <footer className="font-primary py-3 fs-5 bg-primary-green text-white">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <small className="d-block">
                &copy; {year} Imran Medical Center. All Right Reserved.
              </small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LayoutFront;
