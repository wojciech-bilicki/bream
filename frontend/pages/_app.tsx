import React, { useState } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/common/theme";
import Api from "../src/common/api";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "../src/common/reactQueryClient";
import { UserData, verify } from "../src/auth/auth.api";
import { AuthContext } from "../src/auth/Auth.context";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const [isAppReady, setIsAppReady] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>();

  React.useEffect(() => {
    const preload = async () => {
      Api.init();
      try {
        const loggedInUserData = await verify();
        setUserData(loggedInUserData);
      } catch (e) {
        console.error("Cannot verify token from the last session");
        setUserData(undefined);
      }
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector("#jss-server-side");
      if (jssStyles) {
        jssStyles.parentElement!.removeChild(jssStyles);
      }
      setIsAppReady(true);
    };
    preload();
  }, []);

  if (!isAppReady) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthContext.Provider value={{ userData, setUserData }}>
          <Component {...pageProps} />
        </AuthContext.Provider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
