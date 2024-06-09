import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAuthContext } from "../hooks/useAuthContext";
const TextCard = () => {
  const { user, type } = useAuthContext();
  return (
    <Card sx={{ 
      minWidth: 100, 
      marginLeft: '300px',
      border: '5px solid #0055A5', // Add border style here
    }} style={{ width: '300px', height: '200px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
          What to do?
        </Typography>
        <Typography variant="h6" component="div" style={{ fontSize: '1.15rem', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
        {user && type === 'Student' ? (
            <>
              <span style={{ color: '#007bff' }}>1. Tap on Activity to do</span>
              <br />
              <span style={{ color: 'black' }}>2. Locked 🔒? Cannot do</span>
            </>
          ) : user && type === 'Teacher' ? (
            <>
              <span style={{ color: '#007bff' }}>1. Generate Activity:</span> Scroll down to find option!
              <br />
              <span style={{ color: '#28a745' }}>2. See Published Activities:</span> Tap the Activity Button.
            </>
          ) : null}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TextCard;
