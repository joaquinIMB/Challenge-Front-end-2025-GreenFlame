import { type RateDetails } from "../../types/CarData.types";

export interface CarDetailProps {
  rates: RateDetails[];
  rentalDays: number;
  selected: boolean;
  onSelect: (selectedRate: RateDetails) => void;
}
