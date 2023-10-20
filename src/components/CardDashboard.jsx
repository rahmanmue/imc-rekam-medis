function CardDashboard({ style, title, children, total }) {
  return (
    <div
      className={`${style} text-white d-flex gap-2 align-items-center justify-content-around p-4 rounded`}
    >
      {children}
      <div className="text-center">
        <div className="fs-5 fw-bold">{title}</div>
        <div className="fs-1 fw-bold">{total}</div>
      </div>
    </div>
  );
}

export default CardDashboard;
