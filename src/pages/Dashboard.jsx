import {
  LayoutBack,
  CardDashboard,
  CardDashboardWelcome,
} from "./../components";
import { FaFileMedical, FaUserInjured } from "react-icons/fa";

function Dashboard() {
  return (
    <LayoutBack>
      <div className="font-primary text-dark-blue">
        <CardDashboardWelcome user={"pasien"} />

        <div className="flex-content gap-3">
          <CardDashboard
            style={"bg-dark-blue"}
            title={"Jumlah Antrian"}
            total={"50"}
          >
            <FaFileMedical style={{ fontSize: "5rem" }} />
          </CardDashboard>
          <CardDashboard
            style={"bg-dark-blue"}
            title={"Jumlah Pasien"}
            total={"150"}
          >
            <FaUserInjured style={{ fontSize: "5rem" }} />
          </CardDashboard>
        </div>
      </div>
    </LayoutBack>
  );
}

export default Dashboard;
