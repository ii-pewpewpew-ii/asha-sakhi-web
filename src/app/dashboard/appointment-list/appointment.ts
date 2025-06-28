export interface Appointment {
  workerId?: number;
  patientId?: number;
  appointmentId?: number;
  appointmentDate?: string;
  appointmentStatus?: string;
  appointmentType?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
