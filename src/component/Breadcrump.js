const Breadcrump = ({ prevtext, text }) => {
  return (
    <div
      className="bread-crumb"
      style={{
        backgroundColor: "#D1D0CE",
        padding: "5px 5px 5px 50px",
      }}
    >
      <nav aria-label="breadcrumb" style={{ margin: "0" }}>
        <ol className="breadcrumb" style={{ margin: "0" }}>
          <li className="breadcrumb-item" style={{ margin: "0" }}>
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "14px",
              }}
            >
              Trang Chủ
            </a>
          </li>
          {prevtext != null && (
            <li className="breadcrumb-item" style={{ margin: "0" }}>
              <a
                href="/products/all"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "14px",
                }}
              >
                {prevtext}
              </a>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {text}
          </li>
        </ol>
      </nav>
    </div>
  );
};
export default Breadcrump;
