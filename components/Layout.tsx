import { NextPage } from "next"
import NavBar from "./NavBar/NavBar"

const Layout: NextPage = ({children})=> {
    return (
        <>
            <NavBar/>
            {children}
        </>
    )
}

export default Layout