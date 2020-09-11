import styled from "styled-components";
import NavLink from "./NavLink";


const NavLinksWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;      
`


const NavLinks = () => {
    return(
        <NavLinksWrapper>
            <NavLink href='/sign-in'>
                Sign In
            </NavLink>
            <NavLink href='/explore-posts'>
                Explore Posts
            </NavLink>
        </NavLinksWrapper>
    )
}


export default NavLinks