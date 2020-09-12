import WebsiteLogo from '../../public/logo.svg'
import styled from 'styled-components'

const Logo = styled(WebsiteLogo)`
    height: 50px;
    width: 50px;
    color: white; 
    border: 1px solid white;
    border-radius: 50%;
    padding: 5px; 
    background-color: whitesmoke;

    &:hover {
        background-color: black;
        cursor: pointer;
    }
`

export default Logo