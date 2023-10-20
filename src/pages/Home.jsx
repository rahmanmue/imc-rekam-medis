import { logo, heroImage, aboutImage } from "../assets";
import { LayoutFront } from "../components";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";

function Home() {
  return (
    <LayoutFront logo={logo}>
      <section id="hero">
        <div className="container">
          <div className="flex-content align-items-center pt-5 pb-3">
            <div className="col-md-6">
              <h1 className="font-primary fw-bold fs-title">
                Cek Kesehatan Anda untuk Mengetahui Kondisi Tubuh Anda Saat Ini
              </h1>
              <p className="font-secondary fs-desc">
                Di dalam tubuh yang sehat terdapat jiwa yang kuat. Mari
                periksakan tubuh anda saat ini dengan klik tombol periksa
                sekarang dibawah ini.
              </p>
              <a
                href="login.html"
                className="bg-light-green text-white fw-bold font-secondary fs-5 rounded-pill py-2 px-4 text-center shadow-btn d-inline-block mt-1"
              >
                Periksa Sekarang <MdKeyboardArrowRight className="fs-2" />
              </a>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <img src={heroImage} className="hero-image my-5" alt="image" />
            </div>
          </div>
        </div>
      </section>

      <section id="info">
        <div className="container">
          <div className="info m-auto d-flex flex-column justify-content-around align-items-center gap-3 text-white font-primary bg-dark-blue py-3 rounded-2 mt-3">
            <h5 className="text-center fs-5 fw-bold font-primary text-uppercase">
              Jam Pelayanan
            </h5>
            <div className="d-flex gap-3">
              <div className="text-center w-100 h-25">
                <h1 className="text-uppercase fw-bold">09.00 - 16.00</h1>
                <span className="text-uppercase fw-bold fs-6">
                  senin - jumat
                </span>
              </div>
              <div className="info-center"></div>
              <div className="text-center w-100 h-25">
                <h1 className="text-uppercase fw-bold">Libur</h1>
                <span className="text-uppercase fw-bold fs-6">
                  SABTU - MINGGU & Tanggal Merah
                </span>
              </div>
            </div>
            <h5 className="text-center fs-6 fw-light">
              *Jadwal bisa berubah, harap tanya kontak kami untuk lebih lanjut
            </h5>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <h1 className="fw-bold text-center pt-3 pb-4">Tentang Kami</h1>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <img src={aboutImage} className="img-fluid" alt="medic" />
            </div>
            <div className="col-md-6 col-sm-12">
              <p className="font-primary fs-5  text-justify">
                Klinik Imran Medical Center adalah sebuah pelayanan kesehatan
                yang berlokasi di Jl. Perintis Kemerdekaan No.130, Cibadak, Kec.
                Cibadak, Kabupaten Sukabumi, Jawa Barat 43351 dengan tempat yang
                strategis berada dipinggir jalan raya utama. Klinik ini
                didirikan oleh Dr. Imran. Dokter berpengalaman yang telah
                mendedikasikan dirinya untuk memberikan perawatan kesehatan
                berkualitas kepada pasien-pasiennya selama lebih dari Sepuluh
                Tahun. dengan mengutamakan pelayanan yang personal dan berfokus
                pada pasien, dengan tujuan untuk memastikan setiap pasien merasa
                didengar dan mendapatkan perawatan yang sesuai dengan kebutuhan
                mereka.
              </p>
              <a
                href="#address"
                className="d-inline-block my-2 rounded-pill py-2 px-4 bg-yellow text-dark font-primary fw-bold shadow-btn font-secondary"
              >
                Lihat Alamat Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="address" className="mt-5 pt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15843.612094702803!2d106.7787774!3d-6.9021999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e683134b7388953%3A0x68664457b1eec40b!2sDr%20Imran!5e0!3m2!1sid!2sid!4v1697546780260!5m2!1sid!2sid"
                width={"100%"}
                height={"500"}
                loading={"lazy"}
              ></iframe>

              <div className="d-flex justify-content-center my-3">
                <a
                  href="https://www.google.com/maps/place/Dr+Imran/@-6.9021999,106.7787774,15z/data=!4m6!3m5!1s0x2e683134b7388953:0x68664457b1eec40b!8m2!3d-6.9021999!4d106.7787774!16s%2Fg%2F11lpbc_c7q?entry=ttu"
                  target="_blank"
                  className="d-inline-block my-2 rounded-pill py-2 px-4 bg-yellow text-dark font-primary fw-bold shadow-btn font-secondary"
                  rel="noreferrer"
                >
                  Buka Peta
                </a>
              </div>
            </div>

            <div className="col-md-12 text-center">
              <h1 className="py-1 fs-title fw-bold font-primary">
                Alamat Kami
              </h1>
              <p className="fs-desc font-secondary text-center text-dark-blue fs-4 w-75 mx-auto">
                Jl. Perintis Kemerdekaan No.130, Cibadak, Kec. Cibadak,
                Kabupaten Sukabumi, Jawa Barat 43351
              </p>
            </div>

            <div className="col-md-12 " id="contact">
              <div className="flex-content justify-content-center align-items-center gap-3">
                <a
                  href=""
                  className="bg-primary-green py-3 px-4 fs-5 rounded-pill text-white shadow-btn fw-bold font-secondary"
                >
                  <BsWhatsapp className="fs-2 me-2" /> Kontak Admin
                </a>
                <p className="text-justify font-secondary fs-5 text-dark-blue text-center">
                  Jika ada yang ditanyakan silahkan anda klik tombol kontak
                  admin untuk info lebih lanjut
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutFront>
  );
}

export default Home;
