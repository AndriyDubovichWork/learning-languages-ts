import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E58A00',
    },
    secondary: {
      main: '#1B1B1B',
      contrastText: '#f7f6f6',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#fff',
    },
  },
});
export default theme;
