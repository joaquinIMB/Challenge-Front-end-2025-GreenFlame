import React, { useEffect, useMemo, useCallback } from "react";
import CarCard from "./components/CarCard/CarCard";
import Filters from "./components/Filters/Filters";
import HeaderCard from "./components/HeaderCard/HeaderCard";
import SelectedCarsBar from "./components/SelectedCarsBar/SelectedCarsBar";
import { useCarStore } from "./stores/carStore";
import {
  type Car,
  type CompanyData,
  type RateDetails,
} from "./types/CarData.types";
import { companyIcons } from "./utils/companyData";

const App: React.FC = () => {
  const carsData = useCarStore((state) => state.carsData);
  const error = useCarStore((state) => state.error);
  const loading = useCarStore((state) => state.loading);
  const fetchCars = useCarStore((state) => state.fetchCars);
  const quotation = useCarStore((state) => state.quotation);
  const addCarToQuotation = useCarStore((state) => state.addCarToQuotation);
  const removeCarFromQuotation = useCarStore(
    (state) => state.removeCarFromQuotation
  );

  // Estados de ordenamiento/filtrado del store
  const sortBy = useCarStore((state) => state.sortBy);
  const showHighlightedFirst = useCarStore(
    (state) => state.showHighlightedFirst
  );

  // Obtener estados de los filtros de checkboxes y rango de precio desde el store
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

  useEffect(() => {
    if (!carsData && !loading) {
      fetchCars();
    }
  }, [carsData, loading, fetchCars]);

  const handleToggleCarInQuotation = useCallback(
    (car: Car, selectedRate: RateDetails, companyData: CompanyData) => {
      const isCarCurrentlySelected = quotation.some(
        (item) => item.uniqueCarId === car.uniqueId
      );

      if (isCarCurrentlySelected) {
        removeCarFromQuotation(car.uniqueId);
        alert(
          `Vehículo "${car.name_details}" (ID: ${car.uniqueId}) removido de la cotización.`
        );
      } else {
        addCarToQuotation(companyData, car, selectedRate);
      }
    },
    [quotation, addCarToQuotation, removeCarFromQuotation]
  );

  const isCarHighlighted = useCallback((car: Car) => {
    return (
      car.features.category === "Lujo" || car.features.category === "Premium"
    );
  }, []);

  const flatProcessedCars = useMemo(() => {
    const all: {
      car: Car;
      allRates: RateDetails[];
      companyData: CompanyData;
    }[] = [];
    if (carsData && carsData.cars) {
      for (const brandName in carsData.cars) {
        const brandCars = carsData.cars[brandName];
        brandCars.forEach((car) => {
          const ratesArray: RateDetails[] = Object.values(car.rates);
          if (ratesArray.length > 0) {
            all.push({
              car,
              allRates: ratesArray,
              companyData: {
                name: brandName,
                icon: companyIcons[brandName.toLowerCase()],
              },
            });
          }
        });
      }
    }
    return all;
  }, [carsData]);

  const calculatedFilterCounts = useMemo(() => {
    const counts: Record<string, Record<string, number>> = {
      selectedRentalCompanies: {},
      selectedCarCategories: {},
      selectedLuggageCapacity: {},
      selectedPassengerCapacity: {},
    };

    // Helper para aplicar filtros excluyendo una categoría
    const applyFiltersExcept = (
      cars: typeof flatProcessedCars,
      excludedCategory: keyof typeof counts
    ) => {
      let tempFilteredCars = cars;

      // Filtro por Compañía Rentadora (si no es la excluida)
      if (excludedCategory !== "selectedRentalCompanies") {
        const active = Object.keys(selectedRentalCompanies).filter(
          (id) => selectedRentalCompanies[id]
        );
        if (active.length > 0) {
          tempFilteredCars = tempFilteredCars.filter(({ companyData }) =>
            active.includes(companyData.name.toLowerCase())
          );
        }
      }

      // Filtro por Categoría del Auto (si no es la excluida)
      if (excludedCategory !== "selectedCarCategories") {
        const active = Object.keys(selectedCarCategories).filter(
          (id) => selectedCarCategories[id]
        );
        const shouldFilter = active.length > 0 && !active.includes("all_cat");
        if (shouldFilter) {
          tempFilteredCars = tempFilteredCars.filter(({ car }) =>
            active.some(
              (filterId) =>
                car.features.category.toLowerCase().replace(/ /g, "_") ===
                filterId
            )
          );
        }
      }

      // Filtro por Capacidad de Maletas (si no es la excluida)
      if (excludedCategory !== "selectedLuggageCapacity") {
        const active = Object.keys(selectedLuggageCapacity).filter(
          (id) => selectedLuggageCapacity[id]
        );
        if (active.length > 0) {
          tempFilteredCars = tempFilteredCars.filter(({ car }) => {
            const totalSuitcases =
              car.features.large_suitcase + car.features.small_suitcase;
            return active.some((filterId) => {
              const minLuggage = parseInt(filterId.replace("luggage_", ""), 10);
              return totalSuitcases >= minLuggage;
            });
          });
        }
      }

      // Filtro por Cantidad de Pasajeros (si no es la excluida)
      if (excludedCategory !== "selectedPassengerCapacity") {
        const active = Object.keys(selectedPassengerCapacity).filter(
          (id) => selectedPassengerCapacity[id]
        );
        if (active.length > 0) {
          tempFilteredCars = tempFilteredCars.filter(({ car }) => {
            const carSeats = parseInt(car.features.seats, 10);
            return active.some((filterId) => {
              const parts = filterId.replace("passengers_", "").split("_");
              const minPassengers = parseInt(parts[0], 10);
              if (parts.length > 1) {
                const maxPassengers = parseInt(parts[1], 10);
                return carSeats >= minPassengers && carSeats <= maxPassengers;
              } else {
                return carSeats >= minPassengers;
              }
            });
          });
        }
      }

      // Filtro por Rango de Precio (si no es la excluida)
      tempFilteredCars = tempFilteredCars.filter(({ allRates }) => {
        const priceCOP = parseFloat(
          allRates[0]?.pricing?.COP?.total_charge?.total?.total_amount || "0"
        );
        return priceCOP >= priceRangeFrom && priceCOP <= priceRangeTo;
      });

      return tempFilteredCars;
    };

    // Calcular conteos para Compañía Rentadora
    const preFilteredForRentalCompanies = applyFiltersExcept(
      flatProcessedCars,
      "selectedRentalCompanies"
    );
    preFilteredForRentalCompanies.forEach(({ companyData }) => {
      const companyId = companyData.name.toLowerCase();
      counts.selectedRentalCompanies[companyId] =
        (counts.selectedRentalCompanies[companyId] || 0) + 1;
    });

    // Calcular conteos para Categoría del Auto
    const preFilteredForCarCategories = applyFiltersExcept(
      flatProcessedCars,
      "selectedCarCategories"
    );
    preFilteredForCarCategories.forEach(({ car }) => {
      const categoryId = car.features.category.toLowerCase().replace(/ /g, "_");
      counts.selectedCarCategories[categoryId] =
        (counts.selectedCarCategories[categoryId] || 0) + 1;
      if (categoryId) {
        counts.selectedCarCategories["all_cat"] =
          (counts.selectedCarCategories["all_cat"] || 0) + 1;
      }
    });

    // Calcular conteos para Capacidad de Maletas
    const preFilteredForLuggageCapacity = applyFiltersExcept(
      flatProcessedCars,
      "selectedLuggageCapacity"
    );
    preFilteredForLuggageCapacity.forEach(({ car }) => {
      const totalSuitcases =
        car.features.large_suitcase + car.features.small_suitcase;
      const luggageOptions = [
        "luggage_1",
        "luggage_2",
        "luggage_3",
        "luggage_4",
        "luggage_7",
      ];
      luggageOptions.forEach((filterId) => {
        const minLuggage = parseInt(filterId.replace("luggage_", ""), 10);
        if (totalSuitcases >= minLuggage) {
          counts.selectedLuggageCapacity[filterId] =
            (counts.selectedLuggageCapacity[filterId] || 0) + 1;
        }
      });
    });

    // Calcular conteos para Cantidad de Pasajeros
    const preFilteredForPassengerCapacity = applyFiltersExcept(
      flatProcessedCars,
      "selectedPassengerCapacity"
    );
    preFilteredForPassengerCapacity.forEach(({ car }) => {
      const carSeats = parseInt(car.features.seats, 10);
      const passengerOptions = [
        "passengers_4",
        "passengers_5",
        "passengers_7",
        "passengers_12",
        "passengers_7_8",
      ];
      passengerOptions.forEach((filterId) => {
        const parts = filterId.replace("passengers_", "").split("_");
        const minPassengers = parseInt(parts[0], 10);

        let matches = false;
        if (parts.length > 1) {
          const maxPassengers = parseInt(parts[1], 10);
          matches = carSeats >= minPassengers && carSeats <= maxPassengers;
        } else {
          matches = carSeats >= minPassengers;
        }

        if (matches) {
          counts.selectedPassengerCapacity[filterId] =
            (counts.selectedPassengerCapacity[filterId] || 0) + 1;
        }
      });
    });

    return counts;
  }, [
    flatProcessedCars,
    selectedRentalCompanies,
    selectedCarCategories,
    selectedLuggageCapacity,
    selectedPassengerCapacity,
    priceRangeFrom,
    priceRangeTo,
  ]);

  const processedAndSortedCars = useMemo(() => {
    let filteredCars = flatProcessedCars;

    const activeRentalCompanies = Object.keys(selectedRentalCompanies).filter(
      (id) => selectedRentalCompanies[id]
    );
    if (activeRentalCompanies.length > 0) {
      filteredCars = filteredCars.filter(({ companyData }) =>
        activeRentalCompanies.includes(companyData.name.toLowerCase())
      );
    }

    // Filtro por Categoría del Auto
    const activeCarCategories = Object.keys(selectedCarCategories).filter(
      (id) => selectedCarCategories[id]
    );
    const shouldFilterByCategory =
      activeCarCategories.length > 0 &&
      !activeCarCategories.includes("all_cat");

    if (shouldFilterByCategory) {
      filteredCars = filteredCars.filter(({ car }) =>
        activeCarCategories.some(
          (filterId) =>
            car.features.category.toLowerCase().replace(/ /g, "_") === filterId
        )
      );
    }

    // Filtro por Capacidad de Maletas
    const activeLuggageCapacityFilters = Object.keys(
      selectedLuggageCapacity
    ).filter((id) => selectedLuggageCapacity[id]);
    if (activeLuggageCapacityFilters.length > 0) {
      filteredCars = filteredCars.filter(({ car }) => {
        const totalSuitcases =
          car.features.large_suitcase + car.features.small_suitcase;
        return activeLuggageCapacityFilters.some((filterId) => {
          const minLuggage = parseInt(filterId.replace("luggage_", ""), 10);
          return totalSuitcases >= minLuggage;
        });
      });
    }

    // Filtro por Cantidad de Pasajeros
    const activePassengerCapacityFilters = Object.keys(
      selectedPassengerCapacity
    ).filter((id) => selectedPassengerCapacity[id]);
    if (activePassengerCapacityFilters.length > 0) {
      filteredCars = filteredCars.filter(({ car }) => {
        const carSeats = parseInt(car.features.seats, 10);
        return activePassengerCapacityFilters.some((filterId) => {
          const parts = filterId.replace("passengers_", "").split("_");
          const minPassengers = parseInt(parts[0], 10);
          if (parts.length > 1) {
            const maxPassengers = parseInt(parts[1], 10);
            return carSeats >= minPassengers && carSeats <= maxPassengers;
          } else {
            return carSeats >= minPassengers;
          }
        });
      });
    }

    // Filtro por Rango de Precio (COP)
    filteredCars = filteredCars.filter(({ allRates }) => {
      const priceCOP = parseFloat(
        allRates[0]?.pricing?.COP?.total_charge?.total?.total_amount || "0"
      );
      return priceCOP >= priceRangeFrom && priceCOP <= priceRangeTo;
    });

    const sortedCars = [...filteredCars].sort((a, b) => {
      const aIsHighlighted = isCarHighlighted(a.car);
      const bIsHighlighted = isCarHighlighted(b.car);

      if (showHighlightedFirst) {
        if (aIsHighlighted && !bIsHighlighted) {
          return -1;
        }
        if (!aIsHighlighted && bIsHighlighted) {
          return 1;
        }
      }

      const priceA = parseFloat(
        Object.values(a.car.rates)[0]?.pricing?.COP?.total_charge?.total
          ?.total_amount || "0"
      );
      const priceB = parseFloat(
        Object.values(b.car.rates)[0]?.pricing?.COP?.total_charge?.total
          ?.total_amount || "0"
      );

      if (sortBy === "price_asc") {
        return priceA - priceB;
      } else if (sortBy === "price_desc") {
        return priceB - priceA;
      }
      return 0;
    });

    return sortedCars;
  }, [
    flatProcessedCars,
    sortBy,
    showHighlightedFirst,
    isCarHighlighted,
    selectedRentalCompanies,
    selectedCarCategories,
    selectedLuggageCapacity,
    selectedPassengerCapacity,
    priceRangeFrom,
    priceRangeTo,
  ]);

  if (loading) {
    return (
      <div className="max-w-[1294px] mx-auto pt-6 pb-18 flex gap-7 justify-center items-center h-screen">
        <p className="text-2xl font-semibold">Cargando coches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1294px] mx-auto pt-6 pb-18 flex gap-7 justify-center items-center h-screen text-red-600">
        <p className="text-2xl font-semibold">
          Error al cargar los datos: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1294px] mx-auto pt-6 pb-18 flex gap-7">
      <Filters filterCounts={calculatedFilterCounts} />
      <div className="flex relative w-full flex-col gap-[28px]">
        <HeaderCard foundCarsCount={processedAndSortedCars.length} />

        {processedAndSortedCars.length === 0 ? (
          <div className="max-w-[1294px] mx-auto pt-6 pb-18 flex gap-7 justify-center items-center h-screen">
            <p className="text-2xl font-semibold">
              No se encontraron coches disponibles con los filtros actuales.
            </p>
          </div>
        ) : (
          processedAndSortedCars.map(
            ({ car, allRates, companyData }, index) => (
              <CarCard
                key={index}
                car={car}
                companyData={companyData}
                brand={car.name_details.split(" ")[0]}
                model={car.name_details}
                imageSrc={car.picture_url.normal}
                passengers={parseInt(car.features.seats)}
                largeSuitcases={car.features.large_suitcase}
                smallSuitcases={car.features.small_suitcase}
                doors={parseInt(car.features.doors)}
                ac={car.features.air_conditioner}
                transmission={car.features.transmition}
                rentalDays={3}
                highlighted={isCarHighlighted(car)}
                selected={quotation.some(
                  (item) => item.uniqueCarId === car.uniqueId
                )}
                rates={allRates}
                stars={car.stars}
                onSelectCar={(selectedRate) =>
                  handleToggleCarInQuotation(car, selectedRate, companyData)
                }
              />
            )
          )
        )}
      </div>
      <SelectedCarsBar />
    </div>
  );
};

export default App;
