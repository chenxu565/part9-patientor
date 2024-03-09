import { PatientEntryNoID, Gender, DetailEntryToPatientType, DetailEntryToPatient } from "./types";


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect or missing string');
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender ' + gender);
  }
  return gender;
};

const isEntryType = (param: unknown): param is DetailEntryToPatientType => {
  if (!isString(param)) {
    return false;
  }
  return Object.values(DetailEntryToPatientType).map(v => v.toString()).includes(param);
};

const validateEntries = (entries: unknown): boolean => {
  if (!Array.isArray(entries)) {
    throw new Error('Entries must be an array');
  }
  if (entries.length === 0) {
    return true;
  }
  for (const entry of entries) {
    if (!entry || typeof entry !== 'object' || !('type' in entry) || !isEntryType(entry.type)) {
      throw new Error('Invalid entry type');
    }
  }
  return true;
};

const isPatientEntryNoID = (object: unknown): object is PatientEntryNoID => {

  if (typeof object !== 'object' || object === null) {
    throw new Error('Incorrect or missing data');
  }

  const requiredFields = ['name', 'dateOfBirth', 'ssn', 'gender', 'occupation'];
  return requiredFields.every(field => field in object);
};

const toPatientEntryNoID = (object: unknown): PatientEntryNoID => {

  if (!isPatientEntryNoID(object)) {
    throw new Error('Incorrect or missing data');
  }

  let entries: DetailEntryToPatient[];
  if ('entries' in object) {
    if (!validateEntries(object.entries)) {
      throw new Error('One or more entries are invalid');
    } else {
      entries = object.entries;
    }
  } else {
    entries = [];
  }

  const newEntry: PatientEntryNoID = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: entries
  };
  return newEntry;
};

export default toPatientEntryNoID;