import {
  type CompanyData,
  type Car,
  type RateDetails,
} from "../../types/CarData.types";

export type CarCardProps = {
  companyData: CompanyData;
  brand: string;
  model: string;
  imageSrc: string;
  passengers: number;
  largeSuitcases: number;
  smallSuitcases: number;
  doors: number;
  ac: boolean;
  transmission: string;
  rentalDays: number;
  highlighted?: boolean;
  selected?: boolean;
  rates: RateDetails[];
  stars: number;
  onSelectCar: (selectedRate: RateDetails) => void;
  car: Car;
};
