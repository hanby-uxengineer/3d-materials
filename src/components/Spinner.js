import styled from "styled-components";

const StyledSpinner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(6px);
`;

export default function Spinner() {
    return(
        <StyledSpinner>
            <h3>Loading... 👀</h3>
        </StyledSpinner>
    );
}