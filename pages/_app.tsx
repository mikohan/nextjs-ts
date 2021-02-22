import { useEffect, useState } from 'react';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from 'lib/apollo';
import { themeDark, themeLight } from 'lib/theme';
import { AuthProvider } from 'lib/useAuth';
import Header from 'components/Header';

const MyApp = ({ Component, pageProps }) => {
  const apolloClinet = useApollo(pageProps.initialApolloState);
  const [darkState, setDarkState] = useState(false);
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  useEffect(() => {
    // Remove ssr injected css
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <ApolloProvider client={apolloClinet}>
      <ThemeProvider theme={darkState ? themeDark : themeLight}>
        <CssBaseline />
        <AuthProvider>
          <Header darkState={darkState} handleThemeChange={handleThemeChange} />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
