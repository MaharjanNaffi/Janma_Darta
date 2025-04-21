
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import Header from "@/components/Header";
import FormSection from "@/components/FormSection";
import FormField from "@/components/FormField";
import { toast } from "@/components/ui/use-toast";

const birthFormSchema = z.object({
  // Child Information
  childFullName: z.string().min(3, "Name must be at least 3 characters"),
  childDateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  childGender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  childPlaceOfBirth: z.string().min(2, "Place of birth is required"),
  childBirthPlace: z.enum(["hospital", "home", "other"], {
    required_error: "Please select birth place type",
  }),
  childBirthCertificateNumber: z.string().optional(),
  
  // Father's Information
  fatherFullName: z.string().min(3, "Name must be at least 3 characters"),
  fatherNationalId: z.string().min(5, "National ID must be at least 5 characters"),
  fatherOccupation: z.string().min(2, "Occupation is required"),
  fatherContactNumber: z.string().min(5, "Contact number is required"),
  
  // Mother's Information
  motherFullName: z.string().min(3, "Name must be at least 3 characters"),
  motherNationalId: z.string().min(5, "National ID must be at least 5 characters"),
  motherOccupation: z.string().min(2, "Occupation is required"),
  motherContactNumber: z.string().min(5, "Contact number is required"),
  
  // Address Details
  permanentAddress: z.string().min(5, "Address is required"),
  currentAddress: z.string().optional(),
  
  // Declaration
  declaration: z.boolean().refine((val) => val === true, {
    message: "You must agree to the declaration",
  }),
});

type BirthFormValues = z.infer<typeof birthFormSchema>;

const Index = () => {
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BirthFormValues>({
    resolver: zodResolver(birthFormSchema),
    defaultValues: {
      declaration: false,
    },
  });

  const onSubmit = async (data: BirthFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    console.log(data);
    
    // Simulate API call with 1.5 second delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Registration Submitted",
        description: "Your birth certificate registration has been submitted successfully. Your reference number is BC-" + Math.floor(100000 + Math.random() * 900000),
      });
      form.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Header />
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Child Information Section */}
          <FormSection title="Child Information">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Full Name" htmlFor="childFullName" required>
                <Input 
                  id="childFullName" 
                  placeholder="Enter full name" 
                  {...form.register("childFullName")} 
                  className="w-full"
                />
                {form.formState.errors.childFullName && (
                  <p className="text-sm text-red-500">{form.formState.errors.childFullName.message}</p>
                )}
              </FormField>
              
              <FormField label="Date of Birth" htmlFor="childDateOfBirth" required>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        if (selectedDate) {
                          form.setValue("childDateOfBirth", selectedDate);
                        }
                      }}
                      initialFocus
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.childDateOfBirth && (
                  <p className="text-sm text-red-500">{form.formState.errors.childDateOfBirth.message}</p>
                )}
              </FormField>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Gender" htmlFor="childGender" required>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("childGender", value as "male" | "female" | "other")}
                  defaultValue={form.getValues("childGender")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="gender-male" />
                    <label htmlFor="gender-male" className="text-sm font-medium">Male</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="gender-female" />
                    <label htmlFor="gender-female" className="text-sm font-medium">Female</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="gender-other" />
                    <label htmlFor="gender-other" className="text-sm font-medium">Other</label>
                  </div>
                </RadioGroup>
                {form.formState.errors.childGender && (
                  <p className="text-sm text-red-500">{form.formState.errors.childGender.message}</p>
                )}
              </FormField>
              
              <FormField label="Place of Birth" htmlFor="childBirthPlace" required>
                <Select onValueChange={(value) => form.setValue("childBirthPlace", value as "hospital" | "home" | "other")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select place of birth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.childBirthPlace && (
                  <p className="text-sm text-red-500">{form.formState.errors.childBirthPlace.message}</p>
                )}
              </FormField>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Birth Location" htmlFor="childPlaceOfBirth" required>
                <Input 
                  id="childPlaceOfBirth" 
                  placeholder="Hospital name or address" 
                  {...form.register("childPlaceOfBirth")} 
                  className="w-full"
                />
                {form.formState.errors.childPlaceOfBirth && (
                  <p className="text-sm text-red-500">{form.formState.errors.childPlaceOfBirth.message}</p>
                )}
              </FormField>
              
              <FormField label="Birth Certificate Number (if available)" htmlFor="childBirthCertificateNumber">
                <Input 
                  id="childBirthCertificateNumber" 
                  placeholder="Certificate number" 
                  {...form.register("childBirthCertificateNumber")} 
                  className="w-full"
                />
              </FormField>
            </div>
          </FormSection>
          
          {/* Father's Information Section */}
          <FormSection title="Father's Information">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Full Name" htmlFor="fatherFullName" required>
                <Input 
                  id="fatherFullName" 
                  placeholder="Enter full name" 
                  {...form.register("fatherFullName")} 
                  className="w-full"
                />
                {form.formState.errors.fatherFullName && (
                  <p className="text-sm text-red-500">{form.formState.errors.fatherFullName.message}</p>
                )}
              </FormField>
              
              <FormField label="National ID Number" htmlFor="fatherNationalId" required>
                <Input 
                  id="fatherNationalId" 
                  placeholder="Enter national ID number" 
                  {...form.register("fatherNationalId")} 
                  className="w-full"
                />
                {form.formState.errors.fatherNationalId && (
                  <p className="text-sm text-red-500">{form.formState.errors.fatherNationalId.message}</p>
                )}
              </FormField>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Occupation" htmlFor="fatherOccupation" required>
                <Input 
                  id="fatherOccupation" 
                  placeholder="Enter occupation" 
                  {...form.register("fatherOccupation")} 
                  className="w-full"
                />
                {form.formState.errors.fatherOccupation && (
                  <p className="text-sm text-red-500">{form.formState.errors.fatherOccupation.message}</p>
                )}
              </FormField>
              
              <FormField label="Contact Number" htmlFor="fatherContactNumber" required>
                <Input 
                  id="fatherContactNumber" 
                  placeholder="Enter contact number" 
                  {...form.register("fatherContactNumber")} 
                  className="w-full"
                />
                {form.formState.errors.fatherContactNumber && (
                  <p className="text-sm text-red-500">{form.formState.errors.fatherContactNumber.message}</p>
                )}
              </FormField>
            </div>
          </FormSection>
          
          {/* Mother's Information Section */}
          <FormSection title="Mother's Information">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Full Name" htmlFor="motherFullName" required>
                <Input 
                  id="motherFullName" 
                  placeholder="Enter full name" 
                  {...form.register("motherFullName")} 
                  className="w-full"
                />
                {form.formState.errors.motherFullName && (
                  <p className="text-sm text-red-500">{form.formState.errors.motherFullName.message}</p>
                )}
              </FormField>
              
              <FormField label="National ID Number" htmlFor="motherNationalId" required>
                <Input 
                  id="motherNationalId" 
                  placeholder="Enter national ID number" 
                  {...form.register("motherNationalId")} 
                  className="w-full"
                />
                {form.formState.errors.motherNationalId && (
                  <p className="text-sm text-red-500">{form.formState.errors.motherNationalId.message}</p>
                )}
              </FormField>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Occupation" htmlFor="motherOccupation" required>
                <Input 
                  id="motherOccupation" 
                  placeholder="Enter occupation" 
                  {...form.register("motherOccupation")} 
                  className="w-full"
                />
                {form.formState.errors.motherOccupation && (
                  <p className="text-sm text-red-500">{form.formState.errors.motherOccupation.message}</p>
                )}
              </FormField>
              
              <FormField label="Contact Number" htmlFor="motherContactNumber" required>
                <Input 
                  id="motherContactNumber" 
                  placeholder="Enter contact number" 
                  {...form.register("motherContactNumber")} 
                  className="w-full"
                />
                {form.formState.errors.motherContactNumber && (
                  <p className="text-sm text-red-500">{form.formState.errors.motherContactNumber.message}</p>
                )}
              </FormField>
            </div>
          </FormSection>
          
          {/* Address Details Section */}
          <FormSection title="Address Details">
            <FormField label="Permanent Address" htmlFor="permanentAddress" required>
              <Textarea 
                id="permanentAddress" 
                placeholder="Enter permanent address" 
                {...form.register("permanentAddress")} 
                className="w-full"
              />
              {form.formState.errors.permanentAddress && (
                <p className="text-sm text-red-500">{form.formState.errors.permanentAddress.message}</p>
              )}
            </FormField>
            
            <FormField label="Current Address (if different from permanent address)" htmlFor="currentAddress">
              <Textarea 
                id="currentAddress" 
                placeholder="Enter current address" 
                {...form.register("currentAddress")} 
                className="w-full"
              />
            </FormField>
          </FormSection>
          
          {/* Declaration Section */}
          <FormSection title="Declaration and Submit" className="bg-white">
            <div className="flex items-start space-x-3 mb-6">
              <Checkbox 
                id="declaration" 
                onCheckedChange={(checked) => {
                  form.setValue("declaration", checked === true);
                }} 
                className="mt-1"
              />
              <label htmlFor="declaration" className="text-sm text-gray-700">
                I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that providing false information is punishable by law.
              </label>
            </div>
            {form.formState.errors.declaration && (
              <p className="text-sm text-red-500 mb-4">{form.formState.errors.declaration.message}</p>
            )}
            
            <div className="flex justify-center pt-4">
              <Button type="submit" className="bg-[#0F2B5B] hover:bg-[#0a1e3e] px-12 py-6" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </FormSection>
        </form>
        
        <footer className="mt-10 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Government of Nepal. Department of National ID and Civil Registration.</p>
          <p className="mt-1">For support, call: +977 1234 5678 | Email: support@civilregistration.gov.np</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
