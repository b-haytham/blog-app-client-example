import styled from "@emotion/styled"



const StyledInput= styled.input`
    width: 100%;
    height: 100%;
    border: 2.5px solid black;
    border-radius: 50px;
    padding: 15px 10px 15px 50px;
    outline: none;
    transition: 50ms;
    font-size: 1.5rem;

    &:focus{
        outline: none;
        border: 3px solid black;
        box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
    }


    &:hover {
        border: 3px solid black;
        box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
    }

`



const Input:React.FC<{type?: string | undefined }>= ({type}) => {
    return (
        <div style={{
            margin: '20px 0',
        }}>
            <StyledInput type={type}/>
        </div>
    )
}

export default Input