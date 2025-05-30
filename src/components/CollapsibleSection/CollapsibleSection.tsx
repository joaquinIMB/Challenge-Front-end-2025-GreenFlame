import React, { useState, type ReactNode } from 'react';

const ChevronDownSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#3179BD]">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

const ChevronUpSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#3179BD]">
    <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832l-3.71 3.938a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
  </svg>
);

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  headerContent?: ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, defaultOpen = false, headerContent }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <h2>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full px-[30px] py-3 text-left transition-colors duration-150 ease-in-out bg-[#F0F4FD]`}
        >
          <div className="flex items-center">
            <span className="text-sm font-bold text-[#3179BD]">{title}</span>
            {headerContent && <span className="ml-2">{headerContent}</span>}
          </div>
          {isOpen ? <ChevronUpSvg /> : <ChevronDownSvg />}
        </button>
      </h2>
      {isOpen && (
        <div className="p-4 py-5 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;