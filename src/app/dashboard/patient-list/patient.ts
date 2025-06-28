export interface Patient {
  patientId?: number;
  state?: string;
  city?: string;
  languagePreference?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  deliveryDate?: string;
  mobileNumber?: string;
  employmentStatus?: string;
  religion?: string;
  latitude?: number | null;
  longtitude?: number | null;
  education?: string;
  caste?: string;
  bloodGroup?: string;
  lmp?: string;
  previousIllness?: string;
  profilePhoto?: string | null;
  pregnancyStage?: string | null;
  schemeData?: any | null;
  createdAt?: string;
  updatedAt?: string;
  checkupData?: Checkup[];
}

export interface Checkup {
  workerId?: number;
  patientId?: number;
  checkupId?: number;
  bloodPressure?: number;
  oxygen?: number;
  weight?: number;
  temperature?: number;
  sugarLevel?: number;
  bmi?: number;
  haemoglobin?: string;
  checkupData?: string;
  pregnancyStage?: string;
  checkupType?: string;
  checkupStatus?: number;
  checkupTime?: string;
}


