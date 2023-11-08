import Form from "react-bootstrap/Form";

function Select({ props }) {
  return (
    <div className="mb-2">
      <label className="form-label font-primary fw-bold text-dark-blue">
        {props.label}
      </label>
      <Form.Select
        aria-label="Default select example"
        name={props.name}
        onChange={props.onChange}
        className="form-control text-capitalize"
      >
        <option>{props.value}</option>
        {props.options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.value}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default Select;
