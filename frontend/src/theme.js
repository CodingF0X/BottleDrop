// theme.js

import { createTheme } from '@mui/material/styles';

// Define the global theme
const theme = createTheme({
  typography: {
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
      color: '#333', // Dark Grey
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#4A4A4A', // Medium Grey
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#4A4A4A', // Medium Grey
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#6C6C6C', // Light Grey
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      color: '#6C6C6C', // Light Grey
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#7F7F7F', // Lighter Grey
    },
    body1: {
      fontSize: '1rem',
      color: '#4A4A4A', // Medium Grey
    },
    body2: {
      fontSize: '0.875rem',
      color: '#6C6C6C', // Light Grey
    },
    subtitle1: {
      color: '#7F7F7F', // Lighter Grey
    },
    subtitle2: {
      color: '#B3B3B3', // Even Lighter Grey
    },
    button: {
      color: '#FFF', // White for button text
    },
  },
  palette: {
    mode: 'light', // Light mode for a clean appearance
    primary: {
      main: '#0071E3', // Apple Blue
    },
    secondary: {
      main: '#C0C0C0', // Light Silver
    },
    background: {
      default: '#F4F4F5', // Light Gray Background
      paper: '#FFFFFF',  // White Paper Component Background
    },
    text: {
      primary: '#333', // Dark Grey for text
      secondary: '#6C6C6C', // Light Grey for secondary text
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#0071E3', // Apple Blue for links
          '&:hover': {
            color: '#005BB5', // Darker Blue on hover
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFF', // White text for buttons
          backgroundColor: '#0071E3', // Apple Blue background for buttons
          '&:hover': {
            backgroundColor: '#005BB5', // Darker Blue on hover
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'inherit', // Inherit text color from theme
        },
      },
    },
  },
});

export default theme;
