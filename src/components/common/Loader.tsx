import NovaLogo from "../../assets/nova-store-logo.svg";

function Loader() {
  return (
    <section className="loader-container">
      <img src={NovaLogo} alt="Logo de NovaStore" className="loader-logo" />
      <div className="loader-spinner"></div>
    </section>
  );
}

export default Loader;
