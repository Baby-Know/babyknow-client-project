import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LoadingBar(){

return (
  <div style={{position: 'fixed', top: '50%', left: '50%'}}>
  <Box sx={{ backgroundColor: '#3179a5', borderRadius: '5px', width: '150px', height: '150px', justifyContent: 'center'}}>
  <LinearProgress />
  <Typography>
    Your content is loading...
  </Typography>
</Box>
</div>
)
}

export default LoadingBar;