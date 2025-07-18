export interface SakhiApiResponse<T> {
    data: T
};

export interface Hospital {
  latitude: number;
  longitude: number;
  hospital_care_type: string;
  pregnancy_risk_level: string;
  hospital_name: string;
  telephone: string;
}

export const API_BASE_URL = "http://216.48.183.188:8080/api/"