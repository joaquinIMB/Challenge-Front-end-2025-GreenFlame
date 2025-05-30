export interface FilterItem {
  id: string;
  label: string;
  count: number;
  checked?: boolean;
}

const rentalCompaniesData: FilterItem[] = [
  { id: "avis", label: "Avis", count: 3, checked: false },
  { id: "budget", label: "Budget", count: 3, checked: false },
  { id: "payless", label: "Payless", count: 3 },
];

const carCategoriesData: FilterItem[] = [
  { id: "all_cat", label: "Todas las categorías", count: 3, checked: false },
  { id: "economic", label: "Económico", count: 3, checked: false },
  { id: "compact", label: "Compacto", count: 3, checked: false },
  { id: "intermediate_cat", label: "Intermedio", count: 3 },
  { id: "standard_cat", label: "Standard", count: 3, checked: false },
  { id: "fullsize", label: "Full Size", count: 3, checked: false },
  { id: "suv_intermediate", label: "SUV Intermedio", count: 3, checked: false },
  { id: "premium", label: "Premium", count: 3, checked: false },
  { id: "luxury", label: "Lujo", count: 3, checked: false },
  { id: "convertible", label: "Convertible", count: 3 },
  { id: "suv_premium", label: "SUV Premium", count: 3, checked: false },
  { id: "maxivan", label: "Maxivan", count: 3, checked: false },
  {
    id: "suv_standard_elite",
    label: "SUV Standard Elite",
    count: 3,
    checked: false,
  },
  { id: "minivan", label: "Minivan", count: 3, checked: false },
  { id: "suv_standard", label: "SUV Standard", count: 3 },
];

const luggageCapacityData: FilterItem[] = [
  { id: "luggage_1", label: "1 ó más maletas", count: 3, checked: false },
  { id: "luggage_2", label: "2 ó más maletas", count: 3, checked: false },
  { id: "luggage_3", label: "3 ó más maletas", count: 3, checked: false },
  { id: "luggage_4", label: "4 ó más maletas", count: 3, checked: true },
  { id: "luggage_7", label: "7 ó más maletas", count: 3, checked: false },
];

const passengerCapacityData: FilterItem[] = [
  { id: "passengers_4", label: "4 pasajeros", count: 12, checked: false },
  { id: "passengers_5", label: "5 pasajeros", count: 78, checked: false },
  { id: "passengers_7", label: "7 pasajeros", count: 16, checked: false },
  { id: "passengers_12", label: "12 pasajeros", count: 3, checked: false },
  { id: "passengers_7_8", label: "7/8 pasajeros", count: 3, checked: false },
];

export {
  rentalCompaniesData,
  carCategoriesData,
  luggageCapacityData,
  passengerCapacityData,
};
