
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FormSection = ({ title, children, className }: FormSectionProps) => {
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="text-xl font-semibold text-[#0F2B5B] mb-4 border-b border-[#E5E7EB] pb-2">{title}</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E7EB]">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
