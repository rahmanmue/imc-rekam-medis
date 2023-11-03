import bcrypt from "bcryptjs-react";

export const hashStr = (str) => {
  const hash = bcrypt.hashSync(str, 8);
  return hash;
};

export const compareStr = (str, hash) => {
  const compare = bcrypt.compareSync(str, hash);
  return compare;
};

export const isRole = (hashRole) => {
  const roles = ["pasien", "dokter", "admin"];
  let user = "";
  for (let role of roles) {
    if (bcrypt.compareSync(role, hashRole)) {
      user = role;
      return user;
    } else {
      user = "user";
    }
  }
  return user;
};
