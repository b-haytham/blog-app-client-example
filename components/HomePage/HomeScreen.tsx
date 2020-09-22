import styled from "styled-components"

import HomeScreenWrapper from "./HomeScreenWrapper"


export const Title = styled.h1`
    font-size: 3rem; 
    font-weight: bold;
    text-align: center;
    font-family: Roboto , sans-serif;
    color: black;
    
    @media (max-width: 470px) {
        font-size: 1.5rem;
    }
`



const HomeScreen = () => {
    return (
      <div>hello</div>
    )
}

export default HomeScreen