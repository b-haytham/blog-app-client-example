import React from "react";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import { AppProps } from "next/app";
import Head from "next/head";

import { motion } from "framer-motion";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "../styles/editor.css";

import {
    CssBaseline,
    ThemeProvider as MThemeProvider,
} from "@material-ui/core";

import { theme as Mtheme } from "../utils/theme";

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
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
                    <motion.div key={router.route} initial='pageInitial' animate='pageAnimate' variants={{
                        pageInitial:{
                            opacity: 0
                        },
                        pageAnimate: {
                            opacity: 1,
                            transition: {
                                duration: 0.8
                            }
                        }
                    }}>
                        <Component {...pageProps} />
                    </motion.div>
                </ThemeProvider>
            </MThemeProvider>
        </>
    );
};

export default App;
