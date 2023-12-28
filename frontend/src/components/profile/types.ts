export interface ProfileInterface {
    fullName: string;
    email: string;
    dateOfBirth: string;
    gender: "Male" | "Female";
    height: number;
    weight: number;
    knownDiseases: string;
    allergies: string;
    pastSurgeries: string;
    currentMedications: string;
}
