/* eslint-disable */
import 'normalize.css';
import { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Theme, GlobalStyles } from '../styles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
