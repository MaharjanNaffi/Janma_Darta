
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FormSection = ({ title, children, className }: FormSectionProps) => {
  return (
    <div className={cn("mb-2", className)}>
      <h2 className="text-lg font-semibold text-[#0F2B5B] mb-2">{title}</h2>
      <div>
        {children}
      </div>
    </div>
  );
};

export default FormSection;

