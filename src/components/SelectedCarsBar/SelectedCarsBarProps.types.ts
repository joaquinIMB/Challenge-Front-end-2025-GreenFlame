import { type Car, type RateDetails, type CompanyData } from "../../types/CarData.types";

export interface DisplayCarItem {
  companyData: CompanyData;
  car: Car;
  selectedRate: RateDetails;
  uniqueCarId: string; 
}