
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FormSection = ({ title, children, className }: FormSectionProps) => {
  return (
    <div className={cn("relative", className)}>
      <h2 className="text-xl font-semibold text-[#0F2B5B] mb-6 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0F2B5B]"></span>
        {title}
      </h2>
      <div className="pl-6 border-l border-[#E5E7EB]">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
