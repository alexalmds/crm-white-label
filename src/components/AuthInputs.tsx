import { useState } from 'react';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import InputMask from 'react-input-mask'

interface AuthInputProps {
  newState: (state: string) => void;
  label: string;
  IsPassword?: boolean;
  value?: string;
  mask: string;
}

function AuthInputs(props: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col justify-between items-start w-full relative">
      <label>{props.label}</label>
      <InputMask
         mask={props.mask}
         type={props.IsPassword && !showPassword ? "password" : "text"}
        value={props.value}
        onChange={(e) => props.newState(e.currentTarget.value)}
        className="border rounded-lg w-full h-8 focus-visible:outline-none pr-10"
      />
      {props.IsPassword && (
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-2 top-10 transform -translate-y-1/2 text-red-400 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <TbEyeOff className="text-2xl" /> : <TbEye className="text-2xl" />}
        </button>
      )}
    </div>
  );
}

export default AuthInputs;
