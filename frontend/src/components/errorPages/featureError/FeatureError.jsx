import { Box } from '@mui/material';
import { Iconbox, box } from './style';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function FeatureError() {
  return (
    <Box sx={box}>
      <Box sx={Iconbox}>
        <ErrorOutlineIcon fontSize="large" />
      </Box>
      <Box sx={Iconbox}>
        <h1>In Progress</h1>
      </Box>

      <p>This feature is being worked on please check back later!</p>
    </Box>
  );
}
