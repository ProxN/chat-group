/* eslint-disable */
import 'normalize.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { AuthProvider, ProtectRoute } from '../context/authProvider';
import { Theme, GlobalStyles } from '../styles';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      suspense: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <AuthProvider>
        <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <ProtectRoute>
            <Component {...pageProps} />
          </ProtectRoute>
        </ThemeProvider>
      </AuthProvider>
    </ReactQueryCacheProvider>
  );
};

export default App;
