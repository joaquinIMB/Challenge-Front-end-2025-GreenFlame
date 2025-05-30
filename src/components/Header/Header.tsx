import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="mx-auto flex items-center justify-center px-6 h-[88px] border-b border-gray-200">
        <div className="flex max-w-[1294px] w-full justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <img className="h-auto" src="/icons_logos/logo-udr.svg" alt="" />
          </div>
          <nav className="max-w-[858px] w-full flex items-center justify-between text-sm text-[#1E3050] font-bold">
            <a href="#">Buscar transacción</a>
            <a href="#">Políticas</a>
            <a href="#">Contáctenos</a>
            <div className="flex gap-6">
              <div className="flex items-center gap-8 bg-gray-100 px-4 py-2 rounded-md">
                <img
                  className="h-auto w-6"
                  src="/icons_logos/spa-flag.svg"
                  alt=""
                />
                <span>Español</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
                <span>Hola, Javier</span>
                <span className="bg-[#3179BD] rounded-full h-6 w-6 content-center text-[#DEE6FB] font-thin text-center pt-1 pr-0.5">
                  J
                </span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Booking summary bar */}
      <div className="bg-white  border-t border-b">
        <div className="max-w-[1294px] mx-auto flex items-center justify-between py-3 gap-6 overflow-x-auto font-medium">
          {/* Location */}
          <div className="flex items-center max-w-[630px] justify-between w-full gap-2 text-sm bg-gray-100 text-[#06102D] rounded-md px-6 py-4 whitespace-nowrap">
            Miami International Airport (MIA)
            <img className="h-auto" src="/icons_logos/chevron-icon-gray.svg" />
            Orlando International Airport (MCO)
          </div>

          {/* Dates */}
          <div className="flex items-center max-w-[630px] justify-between gap-9 text-sm bg-gray-100 text-[#06102D] rounded-md px-6 py-4 whitespace-nowrap">
            20 septiembre 2025, 12:00
            <img className="h-auto" src="/icons_logos/chevron-icon-gray.svg" />
            30 septiembre 2025, 18:00
          </div>

          {/* Modify button */}
          <button className="bg-[#3179BD] text-white font-thin text-sm rounded-md px-12 py-4 transition-colors">
            Modificar
          </button>
        </div>
      </div>

      {/* Steps bar */}
      <div className="flex items-center bg-[#102C79] text-white text-sm font-regular h-[68px]">
        <div className="w-full mx-auto max-w-[1166px] flex justify-center gap-[54px] whitespace-nowrap overflow-x-auto">
          <span className="text-white pr-3 font-medium">Selecciona tu vehículo</span>
          <img className="h-auto" src="/icons_logos/chevron-icon.svg" />
          <span className="text-[#7C9AED] px-3">
            Agrega equipamiento adicional
          </span>
          <img className="h-auto" src="/icons_logos/chevron-icon.svg" />
          <span className="text-[#7C9AED] px-3">Información del conductor</span>
          <img className="h-auto" src="/icons_logos/chevron-icon.svg" />
          <span className="text-[#7C9AED] px-3">
            Confirmación de la reserva
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
