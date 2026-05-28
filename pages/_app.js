import { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import GlobalStyle from '../styles/GlobalStyle';
import { darkTheme, lightTheme } from '../styles/theme.config';
import { ThemeToggleContext } from '../components/ThemeContext';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
  const darkMode = useDarkMode(true, {
    storageKey: 'theme',
    classNameDark: 'dark-mode',
    classNameLight: 'light-mode',
  });
  const [mounted, setMounted] = useState(false);
  const theme = darkMode.value ? darkTheme : lightTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeToggleContext.Provider value={{ value: darkMode.value, toggle: darkMode.toggle }}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GlobalStyle />
        <DefaultSeo
          canonical={SEO.openGraph.url}
          {...SEO}
          additionalMetaTags={[
            { name: 'keywords', content: SEO.openGraph.keywords },
            { name: 'twitter:image', content: SEO.openGraph.images[0].url },
            { name: 'twitter:title', content: SEO.openGraph.title },
            { name: 'twitter:description', content: SEO.openGraph.description },
          ]}
        />
        {mounted ? (
          <Layout mounted={mounted}>
            <Component {...pageProps} />
          </Layout>
        ) : null}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}

export default MyApp;
