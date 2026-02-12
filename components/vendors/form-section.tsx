import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

type FormSectionProps = {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
};

export function FormSection({ title, icon: Icon, children }: FormSectionProps) {
  return (
    <div>
      <h3 className="font-bebas text-2xl tracking-tight text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center">
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        {title}
      </h3>
      {children}
    </div>
  );
}
