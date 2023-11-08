function Button({ props }) {
  return (
    <button
      type="submit"
      className="rounded-1 bg-primary-green text-white font-primary fs-5 fw-bold col-12 py-2 shadow-btn border-0 my-4"
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}

export default Button;
