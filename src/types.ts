export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

interface BaseDetailEntryToPatient {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisEntry['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum DetailEntryToPatientType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare"
}

interface HealthCheckEntry extends BaseDetailEntryToPatient {
  type: DetailEntryToPatientType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseDetailEntryToPatient {
  type: DetailEntryToPatientType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseDetailEntryToPatient {
  type: DetailEntryToPatientType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type DetailEntryToPatient =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type DetailEntryToPatientNoID = UnionOmit<DetailEntryToPatient, 'id'>;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: DetailEntryToPatient[];
}

export type NonSensitivePatientEntry =
  Omit<PatientEntry, 'ssn' | 'entries'>;

export type PatientEntryNoID = Omit<PatientEntry, 'id'>;