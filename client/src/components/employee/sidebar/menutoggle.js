export const MenuToggle = ({ toggle }) => (
  <div
    style={{ height: "100vh", width: "2%", zIndex: "1" }}
    className="d-flex flex-column justify-content-center"
    id="togle-zone"
  >
    <div
      style={{ height: "14vh", cursor: "pointer" }}
      className="d-flex flex-column justify-content-center"
      onClick={toggle}
    >
      <div
        style={{ height: "40px", width: "100%" }}
        className="d-flex flex-row justify-content-center"
      >
        <div id="menuTogle"></div>
      </div>
    </div>
  </div>
);
