import React from 'react'
import {ThemeProvider, CSSReset, theme} from '@chakra-ui/core'
import { AppProps } from 'next/app'


const App: React.FC<AppProps> = ({Component,pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset/>
            <Component {...pageProps}/>
        </ThemeProvider>
    )
}

export default App