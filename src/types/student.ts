
export type StudentAllergy = 'Peanuts' | 'Dairy' | 'Gluten' | 'Eggs' | 'Soy' | 'Shellfish' | 'Tree Nuts' | 'Fish';

export type ClassDivision = 
  | '1A' | '1B' | '1C' 
  | '2A' | '2B' | '2C'
  | '3A' | '3B' | '3C'
  | '4A' | '4B' | '4C'
  | '5A' | '5B' | '5C'
  | '6A' | '6B' | '6C'
  | '7A' | '7B' | '7C'
  | '8A' | '8B' | '8C'
  | '9A' | '9B' | '9C'
  | '10A' | '10B' | '10C'
  | '11A' | '11B' | '11C'
  | '12A' | '12B' | '12C';

export type BusRoute = 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6' | 'R7' | 'R8' | 'R9' | 'R10';

export type CardTemplate = 'modern' | 'classic';

export interface StudentData {
  id: string;
  name: string;
  rollNumber: string;
  classDivision: ClassDivision;
  allergies: StudentAllergy[];
  photo: string | null;
  rackNumber: string;
  busRouteNumber: BusRoute;
  createdAt: number;
  template: CardTemplate;
}

export type StudentFormData = Omit<StudentData, 'id' | 'createdAt'>;
