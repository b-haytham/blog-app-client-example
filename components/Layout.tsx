import { NextPage } from "next"
import NavBar from "./NavBar/NavBar"

import Background from '../public/back.svg'



const Layout: NextPage = ({children})=> {
    return (
        <div style={{
        
        }}>
            <NavBar/>
            {children}
        </div>
    )
}

export default Layout