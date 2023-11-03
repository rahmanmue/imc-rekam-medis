import React from "react";
import { gql, useQuery } from "@apollo/client";
import bcrypt from "bcryptjs-react";

// const GETCOBAUSER = gql`
//   query MyQuery {
//     coba_coba_user {
//       id
//       nama
//     }
//   }
// `;

function Coba() {
  const salt = bcrypt.genSaltSync(3);
  const hash = bcrypt.hashSync("ini password", salt);

  console.log(salt);
  console.log(hash);

  console.log(
    // Load hash from your password DB.
    bcrypt.compareSync("ini password", hash)
  );
  return (
    <>
      <input name="password" type="password" placeholder="password" />
      <button>Bcrypt Password</button>
      <p>Password</p>
    </>
  );
}

export default Coba;
