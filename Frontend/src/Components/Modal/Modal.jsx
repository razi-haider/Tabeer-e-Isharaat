import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import CircularProgress from "../CircularProgress/CircularProgress";
import Typography from "@mui/material/Typography";

export default function LayoutModalDialog({ grade, onClose }) {
  //console.log(grade);
  const [layout, setLayout] = React.useState(undefined);

  // Function to open the modal after some time
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLayout("center");
    }, 3000); // Change this value to set the time delay in milliseconds
    return () => clearTimeout(timer);
  }, []);

  return (
    // <Modal open={!!layout} onClose={() => setLayout(undefined)}>
    <Modal open={!!layout} onClose={onClose}>
      <ModalDialog size="lg" layout={layout}>
        <ModalClose />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">Your score:</Typography>
          <CircularProgress
            grade={grade}
          />
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
