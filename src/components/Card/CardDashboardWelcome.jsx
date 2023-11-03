function CardDashboardWelcome({ user }) {
  return (
    <div className="card w-100 mb-3">
      <div className="card-body">
        <h3 className="fs-3">
          Selamat datang, <span className="text-capitalize">{user}</span>{" "}
          &#128075;
        </h3>
        <p className="card-text">
          {user == "pasien"
            ? "Anda belum mengajukan antrian silahkan ajukan antiran dengan klik ajukan antrian medis dibawah ini. Jika ada pertanyaan silahkan hubungi admin kami lewat whatsApp berikut"
            : "Statistik data Jumlah antrian hari ini, dan Jumlah pasien yang sudah terdaftar di website klinik Imran Medical Center"}
        </p>
      </div>
    </div>
  );
}

export default CardDashboardWelcome;
