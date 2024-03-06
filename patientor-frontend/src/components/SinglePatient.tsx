import { Patient } from '../types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { Male, Female, QuestionMark } from '@mui/icons-material';

const SinglePatient = () => {
  const [onePatient, setOnePatient] = useState<undefined | Patient>(undefined);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    if (id) {
      patientService.getOne(id)
        .then(response => {
          setOnePatient(response);
          setError(null);
        })
        .catch(error => {
          // console.error(error);
          setError(error.message);
        });
    }
  }, [id]);

  if (error) {
    return <div><h2>Error loading patient data. Please try again later.</h2></div>;
  }

  if (!onePatient) {
    return <div><h2>Loading...</h2></div>;
  }

  return ( onePatient &&
    <div>
      <h2>{onePatient.name} {onePatient.gender === 'male' ? <Male />: onePatient.gender === 'female' ? <Female /> : <QuestionMark/>}</h2>
      <div>ssn: {onePatient.ssn}</div>
      <div>occupation: {onePatient.occupation}</div>
    </div>
  );
};

export default SinglePatient;
    