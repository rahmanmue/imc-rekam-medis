function LayoutAccess({ children, cover }) {
  return (
    <section id="access">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 side-left">
            <img src={cover} className="img-fluid" alt="" />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

export default LayoutAccess;
