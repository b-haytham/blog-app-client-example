import React from "react";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import { AppProps } from "next/app";
import Head from "next/head";



import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "../styles/editor.css";


import {
    CssBaseline,
    ThemeProvider as MThemeProvider,
} from "@material-ui/core";

import {theme as Mtheme} from '../utils/theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    React.useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <MThemeProvider theme={Mtheme}>
                <ThemeProvider theme={theme}>
                    <CSSReset />
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </MThemeProvider>
        </>
    );
};

export default App;
