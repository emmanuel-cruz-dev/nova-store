function HomeSectionHeader({
  eyebrow,
  heading,
}: {
  eyebrow: string;
  heading: string;
}) {
  return (
    <div className="text-center mb-5">
      <span
        className="text-uppercase fw-semibold custom__text-primary"
        style={{ letterSpacing: "0.08em" }}
      >
        {eyebrow}
      </span>
      <h2 className="display-6 display-md-5 fw-bold text-black home__section-heading">
        {heading}
      </h2>
    </div>
  );
}

export default HomeSectionHeader;
