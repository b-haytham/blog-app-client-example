import {useRouter} from 'next/router' 

import NavBarWrapper from "./NavBarWrapper";
import Logo from './Logo'
import NavLinks from "./NavLinks";

interface navBarProps {}

const NavBar: React.FC<navBarProps> = () => {
    const router = useRouter()

    return (
        <>
            <NavBarWrapper>
                <Logo onClick={()=> router.push('/')}/>
                <NavLinks/>
            </NavBarWrapper>
        </>
    );
};

export default NavBar;
