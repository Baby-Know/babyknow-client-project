import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LoadingBar(){

return (
  <Box sx={{ width: '100%' }}>
  <LinearProgress />
</Box>
)
}

export default LoadingBar;