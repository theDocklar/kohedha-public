import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconBgColor?: string;
  iconColor?: string;
};

export function StatsCard({
  icon: Icon,
  value,
  label,
  iconBgColor = "bg-blue-50",
  iconColor = "text-blue-600",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
      <p className="text-4xl font-bebas text-gray-900 mb-1">{value}</p>
      <p className="font-poppins text-sm font-medium text-gray-600">{label}</p>
    </div>
  );
}
