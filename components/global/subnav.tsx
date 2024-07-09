export default function SubNav({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="flex w-full gap-6 border p-4 ">
      <div className="flex w-full items-center justify-between gap-3">
        <h1 className="font-title text-sm text-slate-800">{title}</h1>
        <span className="text-xs font-light text-slate-700">{description}</span>
      </div>
    </section>
  );
}
