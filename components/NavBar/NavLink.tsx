import styled from 'styled-components'
import NextLink from 'next/link'


const Link = styled.a`
    text-decoration: none;
    color: ${props=> props.color ? props.color: 'white'} ;
    font-size: 1em;
    margin: 0 10px;

    &:hover {
        transform: scale(1.03);
        text-decoration: underline;
        cursor: pointer;
    }    
`




interface NavLinkProps {
    href: string 
    as?: string
    color: string
}

const NavLink: React.FC<NavLinkProps> = (props) => {
    return (
        <NextLink href={props.href} as={props.as}>
            <Link color={props.color}>
                {props.children}
            </Link>
        </NextLink>
    )
}

export default NavLink