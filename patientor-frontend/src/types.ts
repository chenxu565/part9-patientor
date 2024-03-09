import { z } from "zod";

const diagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional()
});

const dateSchema = z.coerce.date().transform((date) => date.toISOString().split('T')[0]);

export type Diagnosis = z.infer<typeof diagnosisSchema>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

const genderSchema = z.nativeEnum(Gender);

const patientSchema = z.object({
  id: z.string(),
  name: z.string(),
  occupation: z.string(),
  gender: genderSchema,
  ssn: z.string().optional(),
  dateOfBirth: dateSchema,
});

export type Patient = z.infer<typeof patientSchema>;

const patientFormValuesSchema = patientSchema.omit({ id: true, entries: true });

export type PatientFormValues = z.infer<typeof patientFormValuesSchema>;

export default {
  diagnosisSchema,
  dateSchema,
  genderSchema,
  patientSchema,
  patientFormValuesSchema
};