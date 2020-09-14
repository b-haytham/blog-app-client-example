import styled from "@emotion/styled"


type Input = {
    isError?: boolean
}




const Input = styled.input<Input>`
    width: 100%;
    height: 100%;
    border: 2.5px solid ${props=> props.isError? 'red' : 'black'} ;
    border-radius: 50px;
    padding: 15px 10px 15px 50px;
    outline: none;
    transition: 50ms;
    font-size: 1.5rem;
    margin: 15px auto;

    &:focus{
        outline: none;
        border: 3px solid ${props=> props.isError? 'red' : 'black'};
        box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
    }


    &:hover {
        border: 3px solid ${props=> props.isError? 'red' : 'black'};
        box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
    }

`





export default Input