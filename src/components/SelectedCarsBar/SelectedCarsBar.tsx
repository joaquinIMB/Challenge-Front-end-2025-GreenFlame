import React, { useState, useCallback, useEffect } from "react";
import { useCarStore } from "../../stores/carStore";
import { type DisplayCarItem } from "./SelectedCarsBarProps.types";

const ArrowNavSvg = "/icons_logos/arrow-icon.svg";

const SelectedCarsBar: React.FC = () => {
  const quotation = useCarStore((state) => state.quotation);
  const removeCarFromQuotation = useCarStore(
    (state) => state.removeCarFromQuotation
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (quotation.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= quotation.length) {
      setCurrentIndex(quotation.length - 1);
    }
  }, [quotation.length, currentIndex]);

  const currentCarItem: DisplayCarItem | undefined = quotation[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotation.length - 1 : prevIndex - 1
    );
  }, [quotation]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quotation.length - 1 ? 0 : prevIndex + 1
    );
  }, [quotation]);

  const handleRemove = useCallback(() => {
    if (currentCarItem) {
      removeCarFromQuotation(currentCarItem.uniqueCarId);
    }
  }, [currentCarItem, removeCarFromQuotation]);

  if (!currentCarItem || quotation.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-90 bg-white shadow-[0_-4px_8px_rgba(0,0,0,0.1)] py-4 px-6">
      <div className="max-w-[1294px] mx-auto flex items-center justify-between relative">
        {/* Sección izquierda: Logo, detalles y navegación */}
        <div className="flex items-center space-x-12 flex-grow">
          {/* Logo de la compañía */}
          {currentCarItem.companyData && currentCarItem.companyData.icon && (
            <img
              src={currentCarItem.companyData.icon}
              alt={currentCarItem.companyData.name}
              className="h-4 w-auto object-contain flex-shrink-0" // Ajusta el tamaño h-10 w-auto
            />
          )}

          {/* Detalles del coche actual */}
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#242B35]">
              {/* Combinado Marca - Tarifa - Grupo de Vehículo */}
              {currentCarItem.companyData.name} -{" "}
              {currentCarItem.selectedRate.rate_data.name} -{" "}
              {currentCarItem.car.vehicle_group}
            </span>
            <span className="text-sm cursor-pointer text-[#3179BD]">
              Ver detalle de la tarífa
            </span>
          </div>
        </div>

        {/* Sección central: Indicador de posición y navegación (ahora más central) */}
        <div className="absolute left-[33%] -translate-x-1/2 bottom-[-16px] flex items-center justify-center space-x-2">
          {/* Botón de navegación anterior */}
          <button
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Coche anterior"
          >
            <img
              src={ArrowNavSvg}
              alt="Anterior"
              className="h-4 w-4 rotate-90"
            />
          </button>
          {/* Indicador de posición */}
          <span className="text-base font-semibold text-[#242B35]">
            {currentIndex + 1} de {quotation.length}
          </span>
          {/* Botón de navegación siguiente */}
          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Coche siguiente"
          >
            <img
              src={ArrowNavSvg}
              alt="Siguiente"
              className="h-4 w-4 -rotate-90"
            />
          </button>
        </div>

        {/* Sección derecha: Precios y botones de acción */}
        <div className="flex items-center space-x-8 flex-shrink-0">
          {/* Imagen del coche (movida a la derecha) */}
          <img
            src={currentCarItem.car.picture_url.normal}
            alt={currentCarItem.car.name_details}
            className="h-20 w-auto object-contain flex-shrink-0"
          />
          <div className="flex flex-col items-end space-y-1">
            <span className="text-lg font-bold text-[#3179BD]">
              {"COP "}
              {
                currentCarItem.selectedRate.pricing.COP.total_charge.total
                  .total_amount
              }
            </span>
            <span className="text-sm text-[#8292AA]">
              {"USD "}
              {
                currentCarItem.selectedRate.pricing.USD.total_charge.total
                  .total_amount
              }
            </span>
          </div>

          <button
            onClick={() => console.log("Continuar cotización")}
            className="bg-[#3179BD] text-white font-semibold py-3 px-[42px] rounded-md transition-colors shadow-sm"
          >
            Continuar
          </button>
          <button
            onClick={handleRemove}
            className="bg-[#E91248] cursor-pointer text-white font-semibold py-3 px-[40px] rounded-md transition-colors shadow-sm flex items-center gap-4 self-center"
          >
            <img
              src={"/icons_logos/delete-logo.svg"}
              alt="Siguiente"
              className="h-4 w-4 "
            />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedCarsBar;
