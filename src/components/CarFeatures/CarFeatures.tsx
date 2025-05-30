import { useMemo } from "react";
import { type CarFeaturesProps } from "./CarFeatures.types";

const CarFeatures = ({
  passengers,
  largeSuitcases,
  smallSuitcases,
  doors,
  ac,
  transmission,
}: CarFeaturesProps) => {

  const featuresList = useMemo(
    () => [
      {
        iconSrc: "/icons_logos/passengers-icon.svg",
        altText: "Pasajeros",
        value: passengers,
      },
            {
        iconSrc: "/icons_logos/doors-icon.svg",
        altText: "Puertas",
        value: doors,
      },
            {
        iconSrc: "/icons_logos/transmission-icon.svg",
        altText: "Transmisión",
        value: transmission === "Automatic" ? "A" : "M",
      },
      {
        iconSrc: "/icons_logos/luggage-icon.svg",
        altText: "Maletas Grandes",
        value: largeSuitcases,
      },
      {
        iconSrc: "/icons_logos/carry-icon.svg",
        altText: "Maletas Pequeñas",
        value: smallSuitcases,
      },

      {
        iconSrc: "/icons_logos/air-conditioning-icon.svg",
        altText: "Aire Acondicionado",
        value: ac ? "SI" : "NO",
      },

    ],
    [passengers, largeSuitcases, smallSuitcases, doors, ac, transmission]
  );

  return (
    <div className="flex gap-x-2 gap-y-2 text-sm text-[#242B35] py-8 justify-between border-b-2 border-[#E0E2EC]">
      {featuresList.map((feature, index) => (
        <div
          key={index}
          className="flex items-center justify-center bg-[#F1F3F6] rounded-md p-2"
        >
          <img
            src={feature.iconSrc}
            alt={feature.altText}
            className="w-3 h-5 mr-1 mb-1 text-[#242B35]"
          />
          <span className="text-[#374D75] font-bold">
            {feature.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CarFeatures;
