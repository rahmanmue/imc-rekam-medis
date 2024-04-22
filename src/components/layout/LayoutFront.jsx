import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { logo } from "../../assets";
import { NavHashLink } from "react-router-hash-link";

function LayoutFront({ children }) {
  const year = new Date().getFullYear();
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="py-3 bg-primary-green font-primary"
      >
        <Container>
          <Navbar.Brand to="/">
            <img src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto mb-2 mb-lg-0 fw-bold fs-5 ">
              <NavHashLink to="#hero" className="text-white nav-link">
                Beranda
              </NavHashLink>
              <NavHashLink to="#info" className="text-white nav-link">
                Tentang Kami
              </NavHashLink>
              <NavHashLink to="#contact" className="text-white nav-link">
                Kontak
              </NavHashLink>
            </Nav>

            <div className="flex-content align-items-center gap-3">
              <Link to="/register" className="pe-lg-3 text-white fw-bold fs-5">
                Daftar
              </Link>
              <Link
                to="/login"
                className="bg-light-green text-white fw-bold fs-5 rounded-pill w-100 py-2 px-4 text-center"
              >
                Masuk
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
