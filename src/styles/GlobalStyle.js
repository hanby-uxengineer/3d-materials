import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
	${reset}

	*, *::before, *::after {
		box-sizing: border-box;
	}

	:root {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-size: 10px;
	}

	body {
		font-family: 'Poppins', sans-serif;
	}
	
	h1 {
		color: white;
		font-size: 5rem;
		font-weight: 600;
	}

	h3 {
		color: white;
		font-size: 2rem;
		font-weight: 600;
	}
`;

export default GlobalStyle;