import express from 'express';
import patientService from '../services/patientService';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import schema from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = schema.patientEntryNoIdSchema.parse(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    return res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).send(fromZodError(error).message);
    } else if (error instanceof Error) {
      return res.status(400).send(error.message);
    } else {
      return res.status(400).send('Unknown error occurred');
    }
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    return res.send(patient);
  } else {
    return res.sendStatus(404);
  }
});

export default router;