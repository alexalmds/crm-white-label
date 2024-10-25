import React from 'react';

interface SelectBoxProps {
  placeholder: string; // Adiciona o placeholder como prop
  options: { value: string; display: string }[];
  value: string;
  onChange: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ placeholder, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <div className="relative">
        <select
          className="
            appearance-none 
            w-full 
            bg-white 
            border 
            border-gray-300 
            rounded-md 
            py-2 
            px-3 
            text-gray-700 
            shadow-sm 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:border-blue-500 
            transition 
            duration-150 
            ease-in-out
            focus:shadow-lg
          "
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {/* Adiciona o placeholder como uma opção desativada */}
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, id) => (
            <option key={id} value={option.value}>
              {option.display}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
