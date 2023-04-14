import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LoadingCircle(props){

return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress variant="determinate" {...props} />
    <Box
      sx={{
        top: '50%',
        left: '45%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#276184'
      }}
    >
      <Typography
        variant="caption"
        component="div"
        color="text.secondary"
      >{`${Math.round(props.value)}%`}</Typography>
    </Box>
  </Box>
)
}

export default LoadingCircle;