interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-text-primary">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}
