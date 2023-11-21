import { error } from "console";
import { DataInterface } from "./types";

interface InputInterface {
  value: string;
  setValue: (v: string) => void;
  type: string;
  error: string;
  isLast?: boolean;
}

export const Input: React.FC<InputInterface> = ({
  value,
  setValue,
  type,
  error,
  isLast = false,
}) => {
  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type={type}
      className={`${!isLast && "mb-7"} border ${
        error !== "" ? "border-red-500" : "border-gray-300"
      } focus:border-blue-500 focus:outline-none transition-all focus:border-2  shadow-none px-7 py-3 rounded-xl`}
      placeholder={type[0].toUpperCase() + type.slice(1)}
    />
  );
};
