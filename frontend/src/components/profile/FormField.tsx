import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";

interface FormFieldProps {
    label: string;
    input?: string | number;
    type: "string" | "number";
}

export const FormField: React.FC<FormFieldProps> = ({ label, input = "", type }) => {
    const [value, setValue] = useState<string | number>(input);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setValue(value);
    };

    return (
        <>
            <FormControl mt={1}>
                <Flex>
                    <FormLabel whiteSpace="nowrap" fontWeight="bold" fontSize="x-large">
                        {label + ": "}
                    </FormLabel>
                    <Input
                        type={type}
                        name={label}
                        value={value.toString()}
                        border="none"
                        onChange={handleChange}
                        outline="none"
                        textAlign="right"
                    />
                </Flex>
            </FormControl>
            <hr style={{ borderColor: "black", borderWidth: "1px" }} />
        </>
    );
};
