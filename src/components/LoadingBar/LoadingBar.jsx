import 
{LinearProgress,
Box,
Card,
CardMedia,
CardContent,
Typography} from '@mui/material/';

import logo from './BK Logo.png';

function LoadingBar() {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', zIndex: '100', top: '30%', left: '30%' }}>
      <Box display='flex' width={500} height={450} justifyContent='center' alignItems='center'>
      <Card sx={{ minWidth: '30em'}}>
      <CardMedia
        sx={{ minHeight: '25em' }}
        image={logo}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Loading content...
        </Typography>
        <LinearProgress color='secondary'/>
      </CardContent>
    </Card>
    </Box>
    </div>
  )
}

export default LoadingBar;