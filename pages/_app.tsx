import React from 'react'
import {ThemeProvider, CSSReset, theme} from '@chakra-ui/core'
import { AppProps } from 'next/app'
 


import '../styles/editor.css'

import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css'; 

const App: React.FC<AppProps> = ({Component,pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset/>
            <Component {...pageProps}/>
        </ThemeProvider>
    )
}

export default App