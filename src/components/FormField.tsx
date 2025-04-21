
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

const FormField = ({ label, htmlFor, required = false, className, children }: FormFieldProps) => {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={htmlFor} className="font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
    </div>
  );
};

export default FormField;
