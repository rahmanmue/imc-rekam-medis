import Form from "react-bootstrap/Form";

function Textarea({ props }) {
  return (
    <div className="mb-2">
      <label className="form-label font-primary fw-bold text-dark-blue">
        {props.label}
      </label>

      <Form.Control
        as="textarea"
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        rows={5}
      />
    </div>
  );
}

export default Textarea;
