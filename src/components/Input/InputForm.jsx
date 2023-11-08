// const INPUTFORM = [//   {
//     label: "Nama",
//     name: "nama",
//     type: "text",
//     placeholder: "Masukan Nama",
//   },
//   {
//     label: "No. Rekam Medis",
//     name: "no_rekam_medis",
//     type: "text",
//     placeholder: "Generate No Rekam Medis",
//   },
//   {
//     label: "Alamat",
//     name: "alamat",
//     type: "text",
//     placeholder: "Masukan Alamat",
//   },
//   {
//     label: "Tanggal Lahir",
//     name: "tgl_lahir",
//     type: "date",
//     placeholder: "Masukan Tanggal Lahir",
//   },
//   {
//     label: "Password",
//     name: "password",
//     type: "password",
//     placeholder: "Masukan Password",
//   },
//   {
//     label: "Konfirmasi Password",
//     name: "confirm_password",
//     type: "password",
//     placeholder: "Masukan Konfirmasi Password",
//   },
// ];

function InputForm({ props }) {
  return (
    <div className="mb-3">
      <label
        htmlFor={props.name}
        className="form-label font-primary fw-bold text-dark-blue"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control "
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        disabled={props.disabled}
        value={props.value}
        required
      />
      <div className="form-text text-danger">
        {props.errMsg ? props.errMsg : " "}
      </div>
    </div>
  );
}

export default InputForm;
