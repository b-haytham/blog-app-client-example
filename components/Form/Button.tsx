import styled from "styled-components";

const Button = styled.button`
    width: 100%;
    padding: 10px 25px;
    background-color: black;
    color: white;
    font-size: 1.5rem;
    font-weight: bolder;
    border-radius: 50px;

    &:hover {
        background-color: white ;
        color: black;
        border: 3px solid black;
        box-shadow: 2px 2px 2px rgba(0,0,0,0.5)
    }

    &:focus{
        outline: none;
    }
`;



export default Button;
