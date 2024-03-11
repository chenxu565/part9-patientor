import { PatientEntry, DiagnosisEntry } from '../types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Male, Female, QuestionMark } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';

import { getColorForRating } from '../utils';
import patientService from '../services/patients';
import EntryDetails from './EntryDetails';
import AddEntryToPatientModal from './AddEntryToPatientModal';

interface PropsColoredFavoriteIcon {
  rating: number;
}

const ColoredFavoriteIcon = ({rating} : PropsColoredFavoriteIcon) => {
  return (
    <Favorite sx={{ color: getColorForRating(rating) }} />
  );
};

interface Props {
  diagnoses: DiagnosisEntry[];
}

const SinglePatient = ({diagnoses}: Props) => {
  const [onePatient, setOnePatient] = useState<undefined | PatientEntry>(undefined);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setModalError(undefined);
  };

  const submitNewEntryToPatient = async (values: unknown) => {
    console.log('submitNewPatient', values);
  };

  useEffect(() => {
    if (id) {
      patientService.getOne(id)
        .then(response => {
          setOnePatient(response);
          setLoadingError(null);
        })
        .catch(error => {
          // console.error(error);
          setLoadingError(error.message);
        });
    }
  }, [id]);

  if (loadingError) {
    return <div><h2>Error loading patient data. Please try again later.</h2></div>;
  }

  if (!onePatient) {
    return <div><h2>Loading...</h2></div>;
  }

  const findDiagnosisNameByCode = (code: string) => {
    const found = diagnoses.find((diagnosis) => diagnosis.code === code);
    return found ? found.name : 'unknown code';
  };

  return ( onePatient &&
    <div>
      <h2>{onePatient.name} {onePatient.gender === 'male' ? <Male />: onePatient.gender === 'female' ? <Female /> : <QuestionMark/>}</h2>
      <div>ssn: {onePatient.ssn}</div>
      <div>occupation: {onePatient.occupation}</div>
      <br/>
      <AddEntryToPatientModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntryToPatient}
        error={modalError}
      />      
      <Button variant="contained" onClick={() => openModal()} >Add new entry</Button>
      <h3>entries</h3>
      {onePatient.entries.map((entry) => {
        return (
          <Box key={entry.id} sx={{ border: '2px solid grey', marginBottom: 2, paddingLeft: 1, borderRadius: 2}}>
            <EntryDetails entry={entry} />
            {entry.diagnosisCodes && 
              <ul>
              {entry.diagnosisCodes.map((code) => {
                return (
                  <li key={code}>
                    {code} {findDiagnosisNameByCode(code)}
                  </li>
                );
              })}
            </ul>}
            {'healthCheckRating' in entry? <ColoredFavoriteIcon rating={entry.healthCheckRating} /> : null}
            {'specialist' in entry? <div>diagnose by {entry.specialist}</div>: null}
          </Box>
        );
      })}      
    </div>
  );
};

export default SinglePatient;
    