import NovaLogo from "../../assets/logos/nova-store-logo.svg";

function Loader() {
  return (
    <section className="loader-container">
      <img src={NovaLogo} alt="Logo de NovaStore" className="loader-logo" />
      <div className="loader-spinner"></div>
    </section>
  );
}

export default Loader;
