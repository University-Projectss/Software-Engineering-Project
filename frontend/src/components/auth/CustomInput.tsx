import { Input } from "@chakra-ui/react";
import { colors } from "../../theme";

interface CustomInputInterface {
  value: string;
  setValue: (v: string) => void;
  type: string;
  error: string;
  isLast?: boolean;
}

export const CustomInput: React.FC<CustomInputInterface> = ({
  value,
  setValue,
  type,
  error,
  isLast = false,
}) => {
  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type={type}
      marginBottom={!isLast ? "28px" : "initial"}
      border={error ? "1px solid red" : "1px solid rgb(209 213 219)"}
      padding="12px 28px 12px 28px"
      borderRadius="10px"
      _focus={{
        border: `1px solid ${colors.blue}`,
      }}
      className={`
       focus:border-blue-500 focus:outline-none transition-all focus:border-2 py-3 rounded-xl`}
      placeholder={type === "text" ? "Email" : "Password"}
    />
  );
};
