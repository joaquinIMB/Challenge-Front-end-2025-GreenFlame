import React, { useState, useCallback } from 'react';
import Popover from '@mui/material/Popover'; 

const CheckSvg = "/icons_logos/check-logo.svg";
const ArrowDownSvg = "/icons_logos/chevron-icon-b.svg";
// --- FIN RUTAS DE TUS SVGs ---

interface InclusionItem {
  name: string;
  description: string;
  visible_voucher: boolean;
}

interface RateInclusionsPopoverProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  rateName: string;
  inclusions: InclusionItem[];
}

const RateInclusionsPopover: React.FC<RateInclusionsPopoverProps> = ({ open, onClose, anchorEl, rateName, inclusions }) => {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  const handlePanelChange = useCallback((panel: string) => {
    setExpandedPanel((prevExpandedPanel) => (prevExpandedPanel === panel ? null : panel));
  }, []);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          borderRadius: '12px', 
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
          width: '393px',
          minHeight:'304px',
          overflow: 'auto',
        },
      }}
    >
      {/* Contenedor principal del popover */}
      <div className="relative w-full bg-white overflow-hidden">
        {/* Encabezado del popover */}
        <div className="flex items-center justify-between border-b border-[#E0E4EA] p-4 px-6">
          <h2 className="text-xl font-bold text-[#242B35]">
            Detalle de la tarifa
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#8292AA] hover:bg-gray-100 transition-colors"
            aria-label="Cerrar"
          >
          </button>
        </div>

        {/* Contenido principal del popover */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Sección del nombre de la tarifa */}
          <div className="py-3 px-6">
            <h3 className="text-lg font-bold text-[#242B35]">
              {rateName}
            </h3>
          </div>

          {/* Lista de inclusiones */}
          {inclusions.length > 0 ? (
            <div className="flex flex-col">
              {inclusions.map((inclusion, index) => {
                const isExpanded = expandedPanel === `panel-${index}`;
                return (
                  <div key={inclusion.name + index}> 
                    {/* Encabezado del acordeón */}
                    <button
                      onClick={() => handlePanelChange(`panel-${index}`)}
                      className="flex w-full items-center justify-between bg-white px-6 py-1 text-left focus:outline-none"
                    >
                      <div className="flex items-center">
                        <img src={CheckSvg} alt="Incluido" className="h-2 w-2 mr-3" style={{ fill: '#03D500' }} /> 
                        <span className="text-sm font-normal text-[#242B35]">
                          {inclusion.name}
                        </span>
                      </div>
                      <img
                        src={ArrowDownSvg}
                        alt="Expandir"
                        className={`h-2 w-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        style={{ fill: '#8292AA' }}
                      />
                    </button>
                    {/* Contenido del acordeón */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-screen pt-1 pb-3 px-11 opacity-100' : 'max-h-0 opacity-0'
                      } text-[#8292AA] text-sm`}
                    >
                      <p>{inclusion.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="p-6 text-[#8292AA]">
              No hay inclusiones detalladas para esta tarifa.
            </p>
          )}
        </div>
      </div>
    </Popover>
  );
};

export default RateInclusionsPopover;