import React, {useState} from 'react';
import {Box, TextField, FormControlLabel, Checkbox, SelectChangeEvent} from '@mui/material';
import dayjs from 'dayjs';
import { DateRange } from 'react-date-range';
import { Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface Props  {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: boolean;
  handleSickLeaveChange: (event: SelectChangeEvent<string>) => void;
  sickLeaveStartDayjs: dayjs.Dayjs | undefined;
  setSickLeaveStartDayjs: React.Dispatch<React.SetStateAction<dayjs.Dayjs | undefined>>;
  sickLeaveEndDayjs: dayjs.Dayjs | undefined;
  setSickLeaveEndDayjs: React.Dispatch<React.SetStateAction<dayjs.Dayjs | undefined>>;
}

const FormOccupationalHealthCare = ({
  employerName,
  setEmployerName,
  sickLeave,
  handleSickLeaveChange,
  sickLeaveStartDayjs,
  setSickLeaveStartDayjs,
  sickLeaveEndDayjs,
  setSickLeaveEndDayjs,
}: Props) => {
  const [dateRange, setDateRange] = useState<Range[]>(
    [{
      startDate: new Date(),
      endDate: new Date((new Date()).getTime() + (24 * 60 * 60 * 1000)),
      key: 'selection'
    }]
  );
  
  return (
    <Box>
      <TextField
        label="Employer Name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      >
      </TextField>
      <FormControlLabel 
        label="Sick Leave"               
        control={
          <Checkbox 
            checked={sickLeave}
            onChange={handleSickLeaveChange}
          />
        }
      />
      {sickLeave &&
        <Box>
          <DateRange
            editableDateInputs={false}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            onChange={(range) => {
              console.log(range);
              setDateRange([range.selection]);
          }}/>
        </Box>
      }
    </Box>
  );
};

export default FormOccupationalHealthCare;
