import { isRole } from "../../utils";

function CardDashboardWelcome({ children, user }) {
  const user_name = localStorage.getItem("nama");
  return (
    <div className="font-primary text-dark-blue px-3">
      <div className="card w-100 mb-3">
        <div className="card-body">
          <h3 className="fs-3">
            Selamat Datang <span className="text-capitalize">{user_name}</span>
            &#128075;
          </h3>
          {user == "pasien" ? (
            <>
              <p className="card-text">Silahkan pilih menu dibawah berikut :</p>
              <ul>
                <li>
                  Klik Ajukan Antrian Medis, jika ingin mengajukan antrian
                </li>
                <li>
                  Jika Antrian Ditolak, Silahkan klik kembali menu tersebut atau
                  hubungi admin untuk info lebih lanjut
                </li>
                <li>
                  Klik Catatan Rekam Medis Anda, Untuk melihat Catatan Medis
                </li>
                <li>
                  Klik Tanya Admin, jika ada sesuatu yang ingin ditanyakan
                </li>
              </ul>
            </>
          ) : user == "admin" || user == "dokter" ? (
            <p>
              Statistik data Jumlah antrian hari ini, dan Jumlah pasien yang
              sudah terdaftar di website klinik Imran Medical Center
            </p>
          ) : (
            " "
          )}
        </div>
      </div>
      <div className="flex-content gap-3">{children}</div>
    </div>
  );
}

export default CardDashboardWelcome;
