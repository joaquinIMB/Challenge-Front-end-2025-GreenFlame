import { type CarCardProps } from "./CarCard.types";
import CarDetail from "../CarDetail/CarDetail";
import { useCarStore } from "../../stores/carStore";
import CarFeatures from "../CarFeatures/CarFeatures";

const CarCard = ({
  companyData,
  car,
  brand,
  model,
  imageSrc,
  passengers,
  largeSuitcases,
  smallSuitcases,
  doors,
  ac,
  transmission,
  rentalDays,
  highlighted,
  selected = false,
  rates,
  stars,
  onSelectCar,
}: CarCardProps) => {
  const { quotation } = useCarStore();

  // Array para generar las estrellas dinámicamente
  const totalStars = 5;
  const starArray = Array.from({ length: totalStars }, (_, i) => i + 1);

  return (
    <div
      className={`
                flex
                bg-white
                rounded-[18px]
                shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]
                w-[968px]
                h-[270px]
                mx-auto
                relative
                overflow-hidden
                items-center
            `}
    >
      <span className="w-[8px] h-full bg-[#3179BD] absolute left-[0px] top-0 z-50"></span>
      {/* Sección izquierda: Detalles del coche */}
      <div className="w-[283.07px] flex flex-col md:flex-row pl-9 pr-8 justify-between">
        {/* Logo de la compañía y Estrellas */}
        <div
          className={`flex flex-col items-start ${
            highlighted ? "justify-center gap-2" : "justify-around"
          } relative h-[270px]`}
        >
          {/* Logo de la Compañía */}
          <div className="flex flex-col justify-start w-full items-start">
            <img
              src={companyData.icon}
              alt={`${brand} ${model}`}
              className="w-auto max-w-[92px] h-auto object-contain mb-2 self-start"
            />
            {/* Estrellas de Calificación Dinámicas */}
            <div className="flex self-start items-center space-x-1">
              {starArray.map((starNumber) => (
                <img
                  key={starNumber}
                  src={
                    starNumber <= stars 
                      ? "/icons_logos/star-solid-icon.svg"
                      : "/icons_logos/star-outlined-icon.svg"
                  }
                  alt={`Star ${starNumber}`}
                  className="w-2 h-2"
                />
              ))}
            </div>
          </div>
          <img
            src={imageSrc}
            alt={`${brand} ${model}`}
            className="max-w-[213px] h-auto min-h-[142px] object-contain mt-4 md:mt-0"
          />
          {highlighted && (
            <div className="bg-[#E5F6F0] text-[#26B489] text-xs gap-1 font-medium py-1 px-1 rounded-md w-[102px] h-[30px] flex items-center justify-center">
              <img
                src="/icons_logos/featured-icon.svg"
                alt="Destacado"
                className="mr-1 h-3.5 w-3.5"
              />
              Destacado
            </div>
          )}
        </div>
      </div>
      {/* Sección central con detalles y separador */}
      <div className="w-[684.93px] h-[270px] flex items-center justify-between pr-4 gap-[36px]">
        {/* Detalles de características y descripción */}
        <div className="h-[270px] w-[53%] flex flex-col justify-center border-r border-dashed border-[#C8CED9] pr-[30px]">
          <div className="">
            <p className="text-xs text-[#ABB7CD] font-semibold uppercase tracking-wider mb-1">
              GRUPO B - CCAR
            </p>
            <h1 className="text-xl font-bold text-[#3179BD] mb-1">{model}</h1>
            <h2 className="text-lg text-[#242B35] font-normal">
              {brand} o similar
            </h2>
          </div>
          <CarFeatures
            passengers={passengers}
            largeSuitcases={largeSuitcases}
            smallSuitcases={smallSuitcases}
            doors={doors}
            ac={ac}
            transmission={transmission}
          />
          {/* Estado de cotización */}
          {selected ? (
            <p className="mt-4 text-[#26B489] text-sm font-medium flex items-center">
              <img
                src="/icons_logos/check-logo.svg"
                alt="Check"
                className="w-2 h-2 mr-3"
              />
              Vehículo agregado a su cotización:{" ("}
              {quotation.findIndex(
                (item) => item.uniqueCarId === car.uniqueId
              ) + 1}
              {" de 5) "}
            </p>
          ) : (
            <p className="mt-4 text-[#3179BD] text-sm flex items-center font-medium">
              <img
                src="/icons_logos/arrow-blue-tobottom.svg"
                alt="Check"
                className="w-3.5 h-3.5 mr-3 mb-[2.5px]"
              />
              Seleccionar este vehículo para cotizar
            </p>
          )}
        </div>
        <CarDetail
          rates={rates}
          rentalDays={rentalDays}
          selected={selected}
          onSelect={onSelectCar}
        />
      </div>
    </div>
  );
};

export default CarCard;
