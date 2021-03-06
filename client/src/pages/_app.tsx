/* eslint-disable */
import 'normalize.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/client';
import { ReactQueryDevtools } from 'react-query-devtools';
import { AuthProvider, ProtectRoute } from '../context/authProvider';
import { Theme, GlobalStyles } from '../styles';
import Layout from '@components/Layout';

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
            <ApolloProvider client={client}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ApolloProvider>
          </ProtectRoute>
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  );
};

export default App;
