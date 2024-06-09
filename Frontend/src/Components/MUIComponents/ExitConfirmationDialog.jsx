import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExitConfirmationDialog({ handleYesClick }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    handleYesClick();
    handleClose(); // Close the dialog
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="large"
        color="error"
        endIcon={<ExitToAppIcon />}
        style={{fontFamily: "Century Gothic"}}
        onClick={handleClickOpen}
      >
        Exit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="exit-confirmation-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: 'white',
          },
        }}
      >
        <DialogContent>
          <DialogContentText id="exit-confirmation-dialog-description" color="black" fontWeight={600}>
            EXIT ACTIVITY?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleExit} color="primary">
            YES
          </Button>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
