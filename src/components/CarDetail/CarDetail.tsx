import { useState } from "react";
import type { CarDetailProps } from "./CarDetail.types";
import { type RateDetails } from "../../types/CarData.types";
import { useCarStore } from "../../stores/carStore";
import { type InclusionItem } from "../RateInclusionsPopover/RateInclusionsPopoverProps";
import RateInclusionsPopover from "../RateInclusionsPopover/RateInclusionsPopover";

const CarDetail = ({
  rates,
  rentalDays,
  selected,
  onSelect,
}: CarDetailProps) => {
  const { quotation } = useCarStore();

  const [currentRateIndex, setCurrentRateIndex] = useState(0);
  const currentRate: RateDetails | undefined = rates[currentRateIndex];

  //  ESTADOS LOCALES PARA EL POPOVER
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isPopoverOpen = Boolean(anchorEl);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handlePrevRate = () => {
    setCurrentRateIndex((prevIndex) =>
      prevIndex === 0 ? rates.length - 1 : prevIndex - 1
    );
  };

  const handleNextRate = () => {
    setCurrentRateIndex((prevIndex) =>
      prevIndex === rates.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!currentRate) {
    return (
      <div className="text-gray-500 text-center py-8">
        No hay tarifas disponibles para este vehículo.
      </div>
    );
  }

  const formatCurrency = (amount: string, currency: string) => {
    try {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) return `N/A ${currency}`;

      if (currency === "COP") {
        return numAmount
          .toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
          .replace("COP", "COP ");
      }
      if (currency === "USD") {
        return numAmount
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace("USD", "USD ");
      }
      return `${currency} ${numAmount.toFixed(2)}`;
    } catch (e) {
      console.error("Error al formatear moneda:", e);
      return `Error ${currency}`;
    }
  };

  //  DATOS DE INCLUSIONES PARA EL POPOVER
  const popoverInclusions: InclusionItem[] = Object.values(
    currentRate.inclusions_meta || {}
  )
    .filter(
      (item): item is InclusionItem =>
        typeof item === "object" &&
        item !== null &&
        "name" in item &&
        "description" in item
    )
    .map((item) => ({
      name: item.name,
      description: item.description,
      visible_voucher: item.visible_voucher || false,
    }));

  return (
    <div className="flex flex-col items-center p-6 justify-between rounded-lg w-[293px] h-[229px] shadowDetail">
      <div className="flex flex-col items-start w-full gap-2">
        <div className="flex items-start self-center justify-center gap-2">
          <h3 className="text-base font-bold text-[#242B35]">
            {currentRate.rate_data.name}
          </h3>
          <span
            className="ml-1 text-blue-500 cursor-pointer text-sm"
            title="Click para ver más información de la tarifa"
            onClick={handleOpenPopover}
          >
            <img
              src="/icons_logos/info-icon.svg"
              alt="Información"
              className="h-4 w-4 inline-block"
            />
          </span>
        </div>
        <p className="text-xs text-[#8292AA] font-normal self-center mb-2">
          Precio por {rentalDays} días de renta
        </p>

        <span className="w-full h-px bg-[#E0E4EA]"></span>

        <div className="flex items-center justify-between w-full">
          <button
            onClick={handlePrevRate}
            disabled={rates.length <= 1}
            className="cursor-pointer w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0px_8px_2px_rgba(0,0,0,0.09)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="/icons_logos/arrow-icon.svg"
              alt="Anterior"
              className="h-4 w-4"
            />
          </button>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#3179BD]">
              {formatCurrency(
                currentRate.pricing.COP.total_charge.total.total_amount,
                "COP"
              )}
            </p>
            <p className="text-sm text-[#8292AA] font-normal">
              (
              {formatCurrency(
                currentRate.pricing.USD.total_charge.total.total_amount,
                "USD"
              )}
              )
            </p>
          </div>
          <button
            onClick={handleNextRate}
            disabled={rates.length <= 1}
            className="cursor-pointer w-10 h-10 rounded-full rotate-[180deg] bg-white flex items-center justify-center shadow-[0_0px_10px_2px_rgba(0,0,0,0.09)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="/icons_logos/arrow-icon-toright.svg"
              alt="Siguiente"
              className="h-4 w-4 rotate-180"
            />
          </button>
        </div>
      </div>

      <button
        onClick={() => onSelect(currentRate)}
        disabled={selected || quotation.length >= 5}
        className={`
       w-full py-2 px-4 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#3179BD] focus:ring-opacity-50
       ${
         selected
           ? "bg-[#C8CED9] text-[#FFFFFF] cursor-not-allowed"
           : "bg-[#3179BD] text-white cursor-pointer"
       }
       ${
         quotation.length >= 5 && !selected
           ? "bg-[#C8CED9] cursor-not-allowed"
           : ""
       }
   `}
      >
        {selected ? "Plan actual" : "Seleccionar"}
      </button>

      {currentRate && (
        <RateInclusionsPopover
          open={isPopoverOpen}
          onClose={handleClosePopover}
          anchorEl={anchorEl}
          rateName={currentRate.rate_data.name}
          inclusions={popoverInclusions}
        />
      )}
    </div>
  );
};

export default CarDetail;
