import { z } from 'zod';
import schema from './types';

const toPatientEntryNoID = (object: unknown) => {

  try {
    const parsed = schema.patientEntryNoIdSchema.parse(object);
    return parsed;
  } catch (e) {
    if (e instanceof z.ZodError) {
      throw new Error(`Validation failed: ${e.message}`);
    }
    throw e;
  }
};

export default toPatientEntryNoID;