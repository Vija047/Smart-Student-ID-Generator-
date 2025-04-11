
import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  StudentFormData, 
  StudentAllergy, 
  ClassDivision, 
  BusRoute,
  CardTemplate 
} from '@/types/student';
import { UploadCloud, X } from 'lucide-react';

const CLASS_DIVISIONS: ClassDivision[] = [
  '1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C',
  '4A', '4B', '4C', '5A', '5B', '5C', '6A', '6B', '6C',
  '7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C',
  '10A', '10B', '10C', '11A', '11B', '11C', '12A', '12B', '12C'
];

const BUS_ROUTES: BusRoute[] = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'];

const ALLERGIES: { value: StudentAllergy; label: string }[] = [
  { value: 'Peanuts', label: 'Peanuts' },
  { value: 'Dairy', label: 'Dairy' },
  { value: 'Gluten', label: 'Gluten' },
  { value: 'Eggs', label: 'Eggs' },
  { value: 'Soy', label: 'Soy' },
  { value: 'Shellfish', label: 'Shellfish' },
  { value: 'Tree Nuts', label: 'Tree Nuts' },
  { value: 'Fish', label: 'Fish' }
];

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => void;
  selectedTemplate: CardTemplate;
  onTemplateChange: (template: CardTemplate) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ 
  onSubmit, 
  selectedTemplate,
  onTemplateChange
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<StudentFormData, 'template'>>({
    name: '',
    rollNumber: '',
    classDivision: '1A',
    allergies: [],
    photo: null,
    rackNumber: '',
    busRouteNumber: 'R1'
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAllergyChange = (allergy: StudentAllergy, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergy]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        allergies: prev.allergies.filter(a => a !== allergy)
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image less than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPhotoPreview(result);
      setFormData(prev => ({ ...prev, photo: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, photo: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter the student's name",
        variant: "destructive"
      });
      return;
    }

    if (!formData.rollNumber.trim()) {
      toast({
        title: "Roll Number is required",
        description: "Please enter the student's roll number",
        variant: "destructive"
      });
      return;
    }

    if (!formData.photo) {
      toast({
        title: "Photo is required",
        description: "Please upload a student photo",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      ...formData,
      template: selectedTemplate
    });

    // Reset form after submission
    setFormData({
      name: '',
      rollNumber: '',
      classDivision: '1A',
      allergies: [],
      photo: null,
      rackNumber: '',
      busRouteNumber: 'R1'
    });
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
        <CardDescription>Enter the student details to generate an ID card</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter student's full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number <span className="text-red-500">*</span></Label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  placeholder="Enter roll number"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="classDivision">Class & Division <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.classDivision}
                  onValueChange={(value) => handleSelectChange("classDivision", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class and division" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASS_DIVISIONS.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rackNumber">Rack Number</Label>
                <Input
                  id="rackNumber"
                  name="rackNumber"
                  placeholder="Enter rack number"
                  value={formData.rackNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="busRouteNumber">Bus Route Number</Label>
                <Select
                  value={formData.busRouteNumber}
                  onValueChange={(value) => handleSelectChange("busRouteNumber", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bus route" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUS_ROUTES.map((route) => (
                      <SelectItem key={route} value={route}>
                        {route}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Photo Upload <span className="text-red-500">*</span></Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                  <div className="space-y-1 text-center">
                    {photoPreview ? (
                      <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-md">
                        <img
                          src={photoPreview}
                          alt="Student"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div onClick={triggerFileInput} className="cursor-pointer">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to upload an image</p>
                        <p className="text-xs text-gray-500">(Max 5MB)</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Allergies (if any)</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {ALLERGIES.map(({ value, label }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`allergy-${value}`}
                        checked={formData.allergies.includes(value)}
                        onCheckedChange={(checked) => handleAllergyChange(value, !!checked)}
                      />
                      <label
                        htmlFor={`allergy-${value}`}
                        className="text-sm cursor-pointer"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label>ID Card Template</Label>
                <div className="bg-gray-100 p-2 rounded-lg flex gap-2">
                  <Button
                    type="button"
                    variant={selectedTemplate === 'modern' ? 'default' : 'outline'}
                    onClick={() => onTemplateChange('modern')}
                    className="flex-1"
                  >
                    Modern
                  </Button>
                  <Button
                    type="button"
                    variant={selectedTemplate === 'classic' ? 'default' : 'outline'}
                    onClick={() => onTemplateChange('classic')}
                    className="flex-1"
                  >
                    Classic
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Generate ID Card</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
