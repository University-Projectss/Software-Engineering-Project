export interface ProfileInterface {
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: string;
  [key: string]: string;
}

/// OBJECTS
export const defaultProfileValues = {
  firstName: "abcd",
  lastName: "",
  sex: "",
  birthDate: "",
};

export const formData: { label: string; type: "string" | "number" }[] = [
  {
    label: "First Name",
    type: "string",
  },
  {
    label: "Last Name",
    type: "string",
  },
  {
    label: "Sex",
    type: "string",
  },

  {
    label: "Birth Date",
    type: "string",
  },
];
