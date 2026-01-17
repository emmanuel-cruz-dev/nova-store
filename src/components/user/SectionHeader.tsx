function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="mb-4">
      <h2 className="custom__text-primary">{title}</h2>
      <p className="custom__text-muted">{subtitle}</p>
    </header>
  );
}

export default SectionHeader;
