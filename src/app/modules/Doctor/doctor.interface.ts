export type IDoctorFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
  // specialties?: string | undefined;
};
export type ISpecialties = {
  specialtiesId: string;
  isDeleted?: null;
};
