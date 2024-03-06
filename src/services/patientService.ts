import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id: id,
    entries: [],
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const patientEntry = patients.find(p => p.id === id);
  if (!patientEntry) {
    return undefined;
  } else {
    if (patientEntry.entries) {
      return patientEntry;
    } else {
      return {
        ...patientEntry,
        entries: []
      };
    }
  }
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById
};