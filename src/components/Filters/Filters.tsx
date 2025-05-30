import React, { useEffect, useMemo, useCallback } from "react";
import CollapsibleSection from "../CollapsibleSection/CollapsibleSection";
import {
  rentalCompaniesData,
  carCategoriesData,
  luggageCapacityData,
  passengerCapacityData,
  type FilterItem,
} from "./FilterItem";
import { useCarStore, type FilterSelectionState } from "../../stores/carStore";
import type { Car } from "../../types/CarData.types";
import Slider from "@mui/material/Slider";

interface FiltersProps {
  filterCounts: Record<string, Record<string, number>>;
}

const DEFAULT_MAX_PRICE_LIMIT = 10000000;

const Filters: React.FC<FiltersProps> = ({ filterCounts }) => {
  const selectedRentalCompanies = useCarStore(
    (state) => state.selectedRentalCompanies
  );
  const selectedCarCategories = useCarStore(
    (state) => state.selectedCarCategories
  );
  const selectedLuggageCapacity = useCarStore(
    (state) => state.selectedLuggageCapacity
  );
  const selectedPassengerCapacity = useCarStore(
    (state) => state.selectedPassengerCapacity
  );
  const priceRangeFrom = useCarStore((state) => state.priceRangeFrom);
  const priceRangeTo = useCarStore((state) => state.priceRangeTo);

  const toggleFilter = useCarStore((state) => state.toggleFilter);
  const setPriceRangeFrom = useCarStore((state) => state.setPriceRangeFrom);
  const setPriceRangeTo = useCarStore((state) => state.setPriceRangeTo);

  const carsData = useCarStore((state) => state.carsData);

  // --- Lógica de cálculo de límites de precios dinámicos ---
  const allCarPrices = useMemo(() => {
    const prices: number[] = [];
    if (carsData && carsData.cars) {
      for (const brandName in carsData.cars) {
        carsData.cars[brandName].forEach((car: Car) => {
          Object.values(car.rates).forEach((rate) => {
            const price = parseFloat(
              rate.pricing.COP.total_charge.total.total_amount
            );
            if (!isNaN(price)) {
              prices.push(price);
            }
          });
        });
      }
    }
    return prices;
  }, [carsData]);

  // Calcula el precio mínimo real de los coches
  const minPriceLimit = useMemo(() => {
    return allCarPrices.length > 0 ? Math.floor(Math.min(...allCarPrices)) : 0;
  }, [allCarPrices]);

  // Calcula el precio máximo *real* de los coches
  const actualMaxPriceFromData = useMemo(() => {
    return allCarPrices.length > 0 ? Math.ceil(Math.max(...allCarPrices)) : 0;
  }, [allCarPrices]);

  // El maxPriceLimit efectivo para el slider y los inputs
  // Será el mayor entre el DEFAULT_MAX_PRICE_LIMIT y el precio máximo real de los datos
  const effectiveMaxPriceLimit = useMemo(() => {
    return Math.max(actualMaxPriceFromData, DEFAULT_MAX_PRICE_LIMIT);
  }, [actualMaxPriceFromData]);

  useEffect(() => {
    // Inicializar priceRangeFrom solo si es su valor por defecto (0) y tenemos un minPriceLimit real
    if (priceRangeFrom === 0 && minPriceLimit !== 0) {
      setPriceRangeFrom(minPriceLimit);
    }
    // Inicializar priceRangeTo solo si es su valor por defecto (0 o MAX_SAFE_INTEGER) y tenemos un effectiveMaxPriceLimit real
    if (
      (priceRangeTo === 0 || priceRangeTo === Number.MAX_SAFE_INTEGER) &&
      effectiveMaxPriceLimit !== 0
    ) {
      setPriceRangeTo(effectiveMaxPriceLimit);
    }
  }, [
    minPriceLimit,
    effectiveMaxPriceLimit,
    priceRangeFrom,
    priceRangeTo,
    setPriceRangeFrom,
    setPriceRangeTo,
  ]);

  const parseCurrencyInput = useCallback((input: string): number => {
    const cleanedInput = input.replace(/\D/g, "");
    const parsed = parseFloat(cleanedInput);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  const handleCheckboxChange = useCallback(
    (
      category:
        | "selectedRentalCompanies"
        | "selectedCarCategories"
        | "selectedLuggageCapacity"
        | "selectedPassengerCapacity",
      id: string
    ) => {
      toggleFilter(category, id);
    },
    [toggleFilter]
  );

  const handlePriceInputChange = useCallback(
    (type: "from" | "to", value: string) => {
      const numericValue = parseCurrencyInput(value);

      if (type === "from") {
        const newFromValue = Math.max(
          minPriceLimit,
          Math.min(numericValue, priceRangeTo, effectiveMaxPriceLimit)
        );
        setPriceRangeFrom(newFromValue);
      } else {
        const newToValue = Math.min(
          effectiveMaxPriceLimit,
          Math.max(numericValue, priceRangeFrom, minPriceLimit)
        );
        setPriceRangeTo(newToValue);
      }
    },
    [
      minPriceLimit,
      effectiveMaxPriceLimit,
      priceRangeFrom,
      priceRangeTo,
      setPriceRangeFrom,
      setPriceRangeTo,
      parseCurrencyInput,
    ]
  );

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        const [newFrom, newTo] = newValue;
        setPriceRangeFrom(
          Math.max(minPriceLimit, Math.min(newFrom, effectiveMaxPriceLimit))
        );
        setPriceRangeTo(
          Math.min(effectiveMaxPriceLimit, Math.max(newTo, minPriceLimit))
        );
      }
    },
    [minPriceLimit, effectiveMaxPriceLimit, setPriceRangeFrom, setPriceRangeTo]
  );

  const formatCurrencyDisplay = useCallback((value: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const renderFilterList = (
    items: FilterItem[],
    categoryKey:
      | "selectedRentalCompanies"
      | "selectedCarCategories"
      | "selectedLuggageCapacity"
      | "selectedPassengerCapacity",
    currentSelectedFilters: FilterSelectionState
  ) => (
    <ul className="space-y-0.5 px-[13px]">
      {items.map((item) => {
        const isChecked = currentSelectedFilters[item.id] || false;
        const count = filterCounts[categoryKey]?.[item.id] || 0;

        return (
          <li key={item.id} className="flex items-center justify-left gap-2">
            <label
              htmlFor={`filter-${categoryKey}-${item.id}`}
              className="flex items-center gap-[20px] cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                id={`filter-${categoryKey}-${item.id}`}
                checked={isChecked}
                onChange={() => handleCheckboxChange(categoryKey, item.id)}
                className="sr-only peer"
              />
              <div
                className={`h-4 w-4 rounded flex items-center justify-center bg-[#3179BD] self-start`}
              >
                {isChecked ? (
                  <img
                    src="/icons_logos/check-filter.svg"
                    alt="Marcado"
                    className="h-2 w-2 rounded"
                  />
                ) : (
                  <div className="h-full w-full rounded border border-gray-300 bg-white"></div>
                )}
              </div>
              <span className="text-[#06102D]">{item.label}</span>
            </label>
            <span className=" text-gray-400">({count})</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="bg-white w-full max-w-[296px] max-h-fit rounded-xl shadow-lg shadow-[#00000010] overflow-hidden">
      <div className="flex items-center gap-2.5 space-x-2 border-b border-gray-200 bg-white p-[30px] py-[24px]">
        <img src="/icons_logos/filter-icon.svg" alt="Filter Icon" />
        <h3 className="text-base font-semibold text-[#3179BD]">
          Filtrar resultados
        </h3>
      </div>
      <CollapsibleSection title="Compañía rentadora" defaultOpen>
        {renderFilterList(
          rentalCompaniesData,
          "selectedRentalCompanies",
          selectedRentalCompanies
        )}
      </CollapsibleSection>
      <CollapsibleSection title="Categoría del auto" defaultOpen>
        {renderFilterList(
          carCategoriesData,
          "selectedCarCategories",
          selectedCarCategories
        )}
      </CollapsibleSection>
      <CollapsibleSection title="Capacidad de maletas" defaultOpen>
        {renderFilterList(
          luggageCapacityData,
          "selectedLuggageCapacity",
          selectedLuggageCapacity
        )}
      </CollapsibleSection>
      <CollapsibleSection title="Cantidad de pasajeros" defaultOpen>
        {renderFilterList(
          passengerCapacityData,
          "selectedPassengerCapacity",
          selectedPassengerCapacity
        )}
      </CollapsibleSection>

      <CollapsibleSection title="Fijar un rango de precio (COP)" defaultOpen>
        <div className="space-y-4 px-[8px]">
          {/* Slider de Rango - Material-UI Slider */}
          <div className="px-1 p-2">
            <Slider
              value={[priceRangeFrom, priceRangeTo]}
              onChange={handleSliderChange}
              min={minPriceLimit}
              max={effectiveMaxPriceLimit}
              disableSwap
              valueLabelDisplay="auto"
              getAriaValueText={(value) => `${formatCurrencyDisplay(value)}`}
              getAriaLabel={() => "Rango de precios"}
              sx={{
                "& .MuiSlider-track": {
                  backgroundColor: "#3179BD", 
                  height: "4px", 
                  borderRadius: "4px",
                },
                // Estilos para el rail (fondo gris de la barra)
                "& .MuiSlider-rail": {
                  backgroundColor: "#E0E4EA", 
                  height: "6px", 
                  borderRadius: "2px",
                },
                // Estilos para los thumbs (los círculos de control)
                "& .MuiSlider-thumb": {
                  backgroundColor: "#3179BD", 
                  width: "30px",
                  height: "30px",
                  boxShadow: "none",
                  // Pseudo-elemento para el círculo blanco interno, como en la imagen
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "none",
                    "&::after": {
                      backgroundColor: "#FFFFFF",
                    },
                    "&:before": {
                      opacity: 0,
                    },
                  },
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#3179BD",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                },
              }}
            />
          </div>

          {/* Input Desde */}
          <div className="flex items-center border border-gray-100 rounded-md overflow-hidden">
            <span className="text-xs bg-gray-100 p-[13px] text-[#9B9FB7] font-bold">
              COP
            </span>
            <label className="text-[#9B9FB7] pl-2 mb-0.5">desde</label>
            <input
              type="text"
              value={formatCurrencyDisplay(priceRangeFrom)}
              onChange={(e) => handlePriceInputChange("from", e.target.value)}
              onBlur={(e) =>
                setPriceRangeFrom(parseCurrencyInput(e.target.value))
              }
              className="flex-1 outline-none p-[9px] pr-[18px] text-sm text-[#3179BD] font-semibold text-right min-w-0"
              placeholder="0"
            />
          </div>

          {/* Input Hasta */}
          <div className="flex items-center border border-gray-100 rounded-md overflow-hidden">
            <span className="text-xs bg-gray-100 p-[13px] text-[#9B9FB7] font-bold">
              COP
            </span>
            <label className="text-[#9B9FB7] pl-2 mb-0.5">hasta</label>
            <input
              type="text"
              value={formatCurrencyDisplay(priceRangeTo)}
              onChange={(e) => handlePriceInputChange("to", e.target.value)}
              onBlur={(e) =>
                setPriceRangeTo(parseCurrencyInput(e.target.value))
              }
              className="flex-1 outline-none p-[9px] pr-[18px] text-sm text-[#3179BD] font-semibold text-right min-w-0"
              placeholder="0"
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default Filters;
