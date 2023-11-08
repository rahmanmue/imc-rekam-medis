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
  if (hashRole) {
    for (let role of roles) {
      if (bcrypt.compareSync(role, hashRole)) {
        user = role;
        return user;
      } else {
        user = "user";
      }
    }
  } else {
    user = "user";
  }
  return user;
};

export const customStyles = {
  rows: {
    style: {
      minHeight: "40px",
    },
  },
  headCells: {
    style: {
      fontSize: "1.1rem",
      fontFamily: '"Source Sans 3", sans-serif',
    },
  },
  cells: {
    style: {
      fontSize: "1rem",
      fontFamily: '"Source Sans 3", sans-serif;',
    },
  },
};

export const paginationComponentOptions = {
  rowsPerPageText: "Baris Per Halaman",
  rangeSeparatorText: "dari",
  selectAllRowsItem: true,
  selectAllRowsItemText: "semua",
};

export const getAge = (date) => {
  let yearNow = new Date().getFullYear();
  let monthNow = new Date().getMonth();
  let dayNow = new Date().getDate();

  let birthYear = Number(date.split("-")[0]);
  let birthMonth = Number(date.split("-")[1]);
  let birthday = Number(date.split("-")[2]);

  let age = yearNow - birthYear;
  if (monthNow <= birthMonth) {
    if (birthday < dayNow) {
      age = age - 1;
    }
  }

  return `${age} Tahun`;
};

export const toRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
