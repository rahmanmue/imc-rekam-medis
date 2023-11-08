import { CardDashboard, CardDashboardWelcome } from "../../components";
import { FaFileMedical, FaUserInjured } from "react-icons/fa";
import { AiFillBook } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import swal from "sweetalert";
import {
  useInsertAntrian,
  useSubscribeStatusAntrian,
  useUpdateAntrian,
  useSubscribeMaxAntrian,
  useSubscribeUser,
} from "../../hooks";
import { isRole } from "../../utils";
import { useNavigate } from "react-router-dom";

function Index() {
  const user = isRole(localStorage.getItem("user_role"));
  const nama = localStorage.getItem("nama");
  const no_rekam_medis = localStorage.getItem("no_rekam_medis");
  const uuid = localStorage.getItem("id");
  const getCardData = (status, style = " ", title = " ", disabled = true) => {
    if (status === "menunggu") {
      style = "bg-success";
      title = "Antrian Menunggu";
    } else if (status === "ditolak") {
      style = "bg-danger";
      title = "Antrian Ditolak, Silahkan Ajukan Kembali";
      disabled = false;
    } else if (status === "diperiksa") {
      style = "bg-success";
      title = "Anda Sudah Diperiksa";
    } else if (status === "diterima") {
      style = "bg-dark-blue";
      title = "Nomor Antrian Anda";
    } else {
      style = "bg-dark-blue";
      title = "Klik Ajukan Antrian Medis";
      disabled = false;
    }
    return {
      style,
      title,
      disabled,
    };
  };

  if (user === "admin" || user === "dokter") {
    const { dataUser } = useSubscribeUser();
    const { maxAntrian } = useSubscribeMaxAntrian();
    const max_no_antrian =
      maxAntrian?.antrian_medis_aggregate?.aggregate.max?.no_antrian;
    const pasien = dataUser?.user_medis.filter(
      (item) => item.user_role === "pasien"
    );
    return (
      <CardDashboardWelcome user={user}>
        <CardDashboard
          style={"bg-dark-blue"}
          title={"Jumlah Antrian Hari Ini"}
          number={max_no_antrian || 0}
          icon={<FaFileMedical style={{ fontSize: "5rem" }} />}
        />

        <CardDashboard
          style={"bg-dark-blue"}
          title={"Jumlah Pasien Terdaftar"}
          number={pasien?.length || 0}
          icon={<FaUserInjured style={{ fontSize: "5rem" }} />}
        />
      </CardDashboardWelcome>
    );
  } else if (user === "pasien") {
    const navigate = useNavigate();
    const { dataStatusAntrian } = useSubscribeStatusAntrian(no_rekam_medis);
    const { insertAntrian, loadingInsertAntrian } = useInsertAntrian();
    const { updateAntrian } = useUpdateAntrian();

    const antrian_medis = dataStatusAntrian?.antrian_medis[0];
    let status_antrian_medis = antrian_medis?.status;
    let no_antrian = antrian_medis?.no_antrian;
    // console.log(antrian_medis);

    const cardData = getCardData(status_antrian_medis);

    const handleAjukanAntrian = () => {
      const insertData = {
        nama: nama,
        no_rekam_medis: no_rekam_medis,
      };

      if (status_antrian_medis === "ditolak") {
        // update status antrian
        updateAntrian({
          variables: {
            _eq: no_rekam_medis,
          },
        })
          .then(({ data }) => {
            console.log(data);
            const affected_rows = data.update_antrian_medis.affected_rows;
            if (affected_rows) {
              swal("Berhasil", "Antrian Sudah Diajukan Kembali", "success", {
                button: true,
              });
            }
          })
          .catch((err) => console.error(err));
      } else {
        insertAntrian({
          variables: {
            objects: insertData,
          },
        })
          .then(({ data }) => {
            const affected_rows = data.insert_antrian_medis.affected_rows;
            if (affected_rows) {
              swal("Berhasil", "Antrian Sudah Diajukan", "success", {
                button: true,
              });
            }
          })
          .catch((error) => console.error(error));
      }
    };

    const handleCatatanMedis = () => {
      navigate(`/rekam-medis/${uuid}`);
    };

    const handleTanyaAdmin = () => {
      window.location.replace("https://wa.link/4x5g4r");
    };

    return (
      <CardDashboardWelcome user={user}>
        <CardDashboard
          style={cardData.style}
          title={cardData.title}
          disabled={cardData.disabled}
          icon={<FaFileMedical style={{ fontSize: "5rem" }} />}
          handleClick={handleAjukanAntrian}
          number={no_antrian === 0 ? "" : no_antrian}
        />

        <CardDashboard
          style={"bg-yellow"}
          title={"Catatan Rekam Medis Anda"}
          icon={<AiFillBook style={{ fontSize: "5rem" }} />}
          handleClick={handleCatatanMedis}
        />

        <CardDashboard
          style={"bg-light-green"}
          title={"Klik untuk Tanya Admin"}
          icon={<BsWhatsapp style={{ fontSize: "5rem" }} />}
          handleClick={handleTanyaAdmin}
        />
      </CardDashboardWelcome>
    );
  }
}

export default Index;
