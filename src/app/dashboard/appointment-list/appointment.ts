export interface Appointment {
  workerId?: number;
  workerName?: string
  patientId?: number;
  patientName: string;
  appointmentDate?: string;
  appointmentStatus?: string;
  appointmentId: number
  checkupIds?: number[];
}
