function CardDashboard({ style, title, icon, number, handleClick, disabled }) {
  return (
    <button
      className={`${style}  text-white d-flex gap-2 align-items-center border-0 justify-content-around p-4 rounded`}
      onClick={() => handleClick()}
      disabled={disabled}
    >
      {icon}
      <div className="text-center">
        <div className="fs-5 fw-bold">{title}</div>
        <div className="fs-1 fw-bold">{number}</div>
      </div>
    </button>
  );
}

export default CardDashboard;
