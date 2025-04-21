
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("flex flex-col items-center gap-2 py-6", className)}>
      <div className="flex items-center gap-4">
        {/* Logo removed as requested */}
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-[#0F2B5B]">Government of Nepal</h1>
          <h2 className="text-md md:text-lg text-[#192A51]">Ministry of Home Affairs</h2>
          <h3 className="text-sm md:text-md text-[#192A51]">Department of National ID and Civil Registration</h3>
        </div>
      </div>
      <h1 className="text-xl md:text-3xl font-bold mt-4 text-[#BA181B]">Birth Certificate Registration Form</h1>
      <div className="mt-2 max-w-3xl text-center text-gray-600 text-sm">
        Please complete all required fields accurately. The information provided will be used for official government records.
      </div>
    </header>
  );
};

export default Header;

