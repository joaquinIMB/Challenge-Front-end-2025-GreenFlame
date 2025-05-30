import { create } from "zustand";
import {
  type Car,
  type RateDetails,
  type CarData,
  type CompanyData,
} from "../types/CarData.types";
import { getCarImageUrl } from "../utils/imageMapper";

import {
  rentalCompaniesData,
  carCategoriesData,
  luggageCapacityData,
  passengerCapacityData,
  type FilterItem,
} from "../components/Filters/FilterItem";

// Modificamos SelectedCarItem para usar el nuevo uniqueId
export type SelectedCarItem = {
  companyData: CompanyData;
  car: Car;
  selectedRate: RateDetails;
  uniqueCarId: string;
};

export type SortOption = "price_asc" | "price_desc" | "relevance";
export type FilterSelectionState = Record<string, boolean>;

const initializeFilterCategoryState = (
  data: FilterItem[]
): FilterSelectionState => {
  return data.reduce((acc, item) => {
    if (item.checked) {
      acc[item.id] = true;
    }
    return acc;
  }, {} as FilterSelectionState);
};

interface CarState {
  carsData: CarData | null;
  loading: boolean;
  error: string | null;
  sortBy: SortOption;
  showHighlightedFirst: boolean;
  selectedRentalCompanies: FilterSelectionState;
  selectedCarCategories: FilterSelectionState;
  selectedLuggageCapacity: FilterSelectionState;
  selectedPassengerCapacity: FilterSelectionState;
  priceRangeFrom: number;
  priceRangeTo: number;
  fetchCars: () => Promise<void>;
  setSortBy: (option: SortOption) => void;
  toggleShowHighlightedFirst: () => void;
  toggleFilter: (
    category:
      | "selectedRentalCompanies"
      | "selectedCarCategories"
      | "selectedLuggageCapacity"
      | "selectedPassengerCapacity",
    id: string
  ) => void;
  setFilterCategory: (
    category:
      | "selectedRentalCompanies"
      | "selectedCarCategories"
      | "selectedLuggageCapacity"
      | "selectedPassengerCapacity",
    selectedIds: FilterSelectionState
  ) => void;
  setPriceRangeFrom: (value: number) => void;
  setPriceRangeTo: (value: number) => void;
  quotation: SelectedCarItem[];
  addCarToQuotation: (
    companyData: CompanyData,
    car: Car,
    selectedRate: RateDetails
  ) => void;
  removeCarFromQuotation: (uniqueCarId: string) => void;
}

export const useCarStore = create<CarState>((set, get) => ({
  carsData: null,
  loading: false,
  error: null,
  sortBy: "relevance",
  showHighlightedFirst: true,
  selectedRentalCompanies: initializeFilterCategoryState(rentalCompaniesData),
  selectedCarCategories: initializeFilterCategoryState(carCategoriesData),
  selectedLuggageCapacity: initializeFilterCategoryState(luggageCapacityData),
  selectedPassengerCapacity: initializeFilterCategoryState(
    passengerCapacityData
  ),
  priceRangeFrom: 0,
  priceRangeTo: 7000000,
  fetchCars: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/carsJSON.json");
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data: CarData = await response.json();

      const processedCarsData: CarData = { cars: {} };
      // Contador global para IDs únicos
      let globalUniqueIdCounter = 0;
      for (const brandName in data.cars) {
        processedCarsData.cars[brandName] = data.cars[brandName].map((car) => {
          const imageUrl = getCarImageUrl(
            car.features.thumb,
            car.name_details,
            car.name
          );

          // Generar un ID único para cada coche
          const newUniqueId = `${
            car.id
          }-${Date.now()}-${globalUniqueIdCounter++}`; // Combinamos el ID existente con timestamp y contador
          // Si car.id no existiera o fuera null, podríamos usar `Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)`

          return {
            ...car,
            picture_url: {
              normal: imageUrl,
              featured: imageUrl,
            },
            uniqueId: newUniqueId,
          };
        });
      }
      set({ carsData: processedCarsData, loading: false });
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "Error desconocido al cargar los datos",
        loading: false,
      });
    }
  },

  setSortBy: (option) => set({ sortBy: option }),
  toggleShowHighlightedFirst: () =>
    set((state) => ({ showHighlightedFirst: !state.showHighlightedFirst })),

  toggleFilter: (category, id) =>
    set((state) => ({
      ...state,
      [category]: {
        ...state[category],
        [id]: !state[category][id],
      },
    })),

  setFilterCategory: (category, selectedIds) =>
    set((state) => ({
      ...state,
      [category]: selectedIds,
    })),

  setPriceRangeFrom: (value) => set({ priceRangeFrom: value }),
  setPriceRangeTo: (value) => set({ priceRangeTo: value }),

  quotation: [],

  addCarToQuotation: (companyDataToAdd, carToAdd, selectedRateToAdd) => {
    set((state) => {
      if (state.quotation.length >= 5) {
        alert("Ya has seleccionado el máximo de 5 vehículos para cotización.");
        return state;
      }

      const isCarAlreadyInQuotation = state.quotation.some(
        (item) => item.uniqueCarId === carToAdd.uniqueId
      );

      if (isCarAlreadyInQuotation) {
        console.warn(
          `El vehículo "${carToAdd.name_details}" (ID: ${carToAdd.uniqueId}) ya está en la cotización.`
        );
        return state;
      }

      return {
        quotation: [
          ...state.quotation,
          {
            car: carToAdd,
            selectedRate: selectedRateToAdd,
            companyData: companyDataToAdd,
            uniqueCarId: carToAdd.uniqueId,
          },
        ],
      };
    });
  },

  removeCarFromQuotation: (uniqueCarIdToRemove) => {
    set((state) => ({
      quotation: state.quotation.filter(
        (item) => item.uniqueCarId !== uniqueCarIdToRemove
      ),
    }));
  },
}));
