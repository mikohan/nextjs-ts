import { useEffect } from 'react';
import App from 'next/app';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { themeDark, themeLight } from 'lib/theme';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove ssr injected css
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
