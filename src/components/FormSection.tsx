
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FormSection = ({ title, children, className }: FormSectionProps) => {
  return (
    <div className={cn("border border-gray-200 rounded-md p-6 mb-6 bg-white shadow-sm", className)}>
      <h2 className="text-lg font-medium text-[#0F2B5B] border-b pb-2 mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
