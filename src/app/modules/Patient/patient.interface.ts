import { BloodGroup, Gender, MetiralStatus } from "@prisma/client";

export type IPatientFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
};
type IPatientHeathData = {
  dateOfBirth: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  hasAllergies: boolean;
  hasDiabetic: boolean;
  height: string;
  weight: string;
  smokingStatus: boolean;
  meritalStatus: MetiralStatus;
  detaryPreferences?: string;
  pregnencyStatus: boolean;
  mentalHelthHistory?: string;
  immunizationStatus?: string;
  previousSurgeries: boolean;
  recentAnxiety: boolean;
  recentDepression: boolean;
  mentalStatus?: string;
};
type IMedicalReport = {
  reportName: string;
  reportLink: string;
};

export type IPatientUpdate = {
  name: string;
  contactNumber: string;
  address: string;
  patientHeathData: IPatientHeathData;
  medicalReport: IMedicalReport;
};
