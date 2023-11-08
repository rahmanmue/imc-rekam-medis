import { isRole } from "../../utils";
import AntrianMedisAdmin from "./AntrianMedisAdmin";
import AntrianMedisDokter from "./AntrianMedisDokter";

function Index() {
  const user = isRole(localStorage.getItem("user_role"));
  if (user === "admin") {
    return <AntrianMedisAdmin />;
  } else if (user === "dokter") {
    return <AntrianMedisDokter />;
  }
}

export default Index;
