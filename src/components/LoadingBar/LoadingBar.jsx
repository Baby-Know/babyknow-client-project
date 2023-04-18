import 
{
Box,
LinearProgress,
Alert,
AlertTitle} from '@mui/material/';

function LoadingBar() {

  return (
    <div display='flex' justify-content='flex-start' position='fixed' right='0' bottom='0'>
    <Box justifyContent='center' alignItems='center'>
      <Alert severity="info">
        <AlertTitle>Content uploading</AlertTitle>
        Please do not refresh your page.
        <LinearProgress />
      </Alert>
      </Box>
      </div>
  )
}

export default LoadingBar;