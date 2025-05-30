import React from "react";
import { useCarStore, type SortOption } from "../../stores/carStore";

interface HeaderCardProps {
  foundCarsCount: number;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ foundCarsCount }) => {
  const sortBy = useCarStore((state) => state.sortBy);
  const showHighlightedFirst = useCarStore(
    (state) => state.showHighlightedFirst
  );
  const setSortBy = useCarStore((state) => state.setSortBy);
  const toggleShowHighlightedFirst = useCarStore(
    (state) => state.toggleShowHighlightedFirst
  );

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortOption);
  };

  const handleHighlightChange = () => {
    toggleShowHighlightedFirst();
  };

  return (
    <div className="flex items-center justify-between top-0 relative w-full py-2">
      <h1 className="text-[#3179BD] font-bold">
        Encontramos {foundCarsCount} vehículos para tu búsqueda.
      </h1>

      <div className="flex items-center space-x-2">
        <label
          htmlFor={`destacados`}
          className="flex items-center gap-4 cursor-pointer text-sm text-[#242B35]"
        >
          <input
            type="checkbox"
            id="destacados"
            className="form-checkbox h-5 w-5 text-[#3179BD] rounded border-gray-300 focus:ring-[#7C9AED] sr-only peer"
            checked={showHighlightedFirst}
            onChange={handleHighlightChange}
          />
          <div
            className={`h-4 w-4 rounded flex items-center justify-center bg-[#3179BD] self-start`} // Ajuste para modo oscuro si es necesario
          >
            {showHighlightedFirst ? (
              <img
                src="/icons_logos/check-filter.svg"
                alt="Marcado"
                className="h-2 w-2 rounded"
              />
            ) : (
              <div className="h-full w-full rounded border border-gray-300 bg-white"></div>
            )}
          </div>
          Mostrar destacados primero
        </label>
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-[#3179BD] text-white text-sm font-medium py-2.5 px-6 rounded-md shadow-sm">
          Enviar cotización
        </button>

        <div className="relative">
          <select
            className="cursor-pointer appearance-none bg-white border border-gray-300 text-[#06102D] text-sm rounded-md py-2.5 pl-4 pr-10 focus:outline-none focus:border-[#7C9AED] focus:ring-1 focus:ring-[#7C9AED] shadow-sm"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="price_desc">Mayor precio</option>
            <option value="price_asc">Menor precio</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCard;
