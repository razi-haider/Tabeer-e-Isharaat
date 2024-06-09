import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  color: "#0055A5",
  //   borderRadius: '19px',
  //   borderWidth: '1px',
  //   borderColor: '#ffffff',
  //   border: '3px solid',
  "& label": {
    fontWeight: "bold",
    fontSize: "1.3rem",
    color: "#0055A5", // Change label color to blue
  },
  '& .MuiInputBase-input': {
    color: '#ffffff', // Change text color of the input value
    fontSize: '1.5rem', // Increase font size of input value
  },
  backgroundColor: "#000000",
  "& label.Mui-focused": {
    color: "#0055A5",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#0055A5",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#0055A5",
    },
  },
  //   '&:hover fieldset': {
  //     borderColor: '#0055A5',
  //   },
  "&.Mui-focused fieldset": {
    borderColor: "#0055A5",
  },
  // },
});

export default function MultilineTextField({ text }) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "37ch" },
        marginTop: "-430px",
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <CssTextField
          id="outlined-textarea"
          label="Selected Words"
        placeholder="selected words will appear here..."
          value={text}
          //defaultValue="selected words will appear here..."
          multiline
          rows={7}
          // disabled={true}
        />
      </div>
    </Box>
  );
}
