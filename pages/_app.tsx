// Material UI support
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/mui/theme';

// import { AuthProvider } from '../auth';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
      {/* <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>*/}
    </ThemeProvider>
  );
}

export default MyApp;
