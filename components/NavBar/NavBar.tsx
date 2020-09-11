import NavBarWrapper from "./NavBarWrapper";
import Logo from './Logo'
import NavLinks from "./NavLinks";

interface navBarProps {}

const NavBar: React.FC<navBarProps> = () => {
    return (
        <>
            <NavBarWrapper>
                <Logo/>
                <NavLinks/>
            </NavBarWrapper>
        </>
    );
};

export default NavBar;
