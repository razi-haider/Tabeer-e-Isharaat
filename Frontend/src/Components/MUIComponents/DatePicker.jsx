import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material';
import { useState } from 'react';

/* You can style the `TextField` component directly */
const StyledTextField = styled(TextField)({
  color: '#0055A5',
  borderRadius: '19px',
  borderWidth: '1px',
  borderColor: '#ffffff',
  border: '3px solid',
  backgroundColor: '#ffffff',
})

export default function BasicDatePicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Call the callback function with the selected date
    onDateChange(date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
        label={"DD/MM/YYYY"}
        value={selectedDate}
        onChange={handleDateChange}
        slots={{
            textField: StyledTextField,
          }} 
         />
      </DemoContainer>
    </LocalizationProvider>
  );
}
