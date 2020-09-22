import { NextPage } from "next"
import NavBar from "./NavBar/NavBar"




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