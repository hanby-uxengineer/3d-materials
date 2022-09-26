import styled from "styled-components";

const StyledSpinner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
`;

export default function Spinner() {
    return(
        <StyledSpinner>
            <h3>Loading... 👀</h3>
        </StyledSpinner>
    );
}