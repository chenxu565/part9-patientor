import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntryToPatientForm from "./AddEntryToPatientForm";
import { onSubmitInterface, onCancelInterface } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: onCancelInterface;
  onSubmit: onSubmitInterface;
  error?: string;
}

const AddEntryToPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryToPatientForm onSubmit={onSubmit} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryToPatientModal;