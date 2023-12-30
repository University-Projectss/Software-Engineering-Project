export interface ProfileInterface {
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: string;
  [key: string]: string;
}

/// OBJECTS
export const defaultProfileValues = {
  firstName: "Anakin",
  lastName: "Skywalker",
  sex: "Male",
  birthDate: "10/11/1970",
};

export const formData: { label: string; type: string }[] = [
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
    type: "date-local",
  },
];
