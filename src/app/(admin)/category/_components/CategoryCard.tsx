import { ReactNode } from "react";

interface Props {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function SectionCard({
  title,
  action,
  children,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm h-fit">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900">
          {title}
        </h2>

        {action}
      </div>

      {children}
    </div>
  );
}