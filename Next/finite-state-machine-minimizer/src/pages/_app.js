import '@/styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       'Roboto',
//       'Roboto Condensed',
//       'Arial',
//       'sans-serif',
//     ].join(','),
//   },
// });

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto Condensed'
    ]
  },
  spacing:8
});

export default function App({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}
