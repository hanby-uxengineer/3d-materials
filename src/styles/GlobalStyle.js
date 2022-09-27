import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./font.css";

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
		background: black;
	}
	
	h1 {
		font-family: 'Poppins', sans-serif;
		color: white;
		font-size: clamp(2.8rem, 7.5vw, 3.6rem);
		font-weight: 700;
		line-height: 120%;
	}

	h2 {
		font-family: 'Noto Sans KR', sans-serif;
		color: white;
		font-size: clamp(1.2rem, 3.2vw, 1.6rem);
        font-weight: 500;
		line-height: 160%;
	}

	h3 {
		font-family: 'Poppins', sans-serif;
		color: white;
		font-size: clamp(1.2rem, 3.2vw, 1.6rem);
        font-weight: 500;
	}

	p {
		font-family: 'Noto Sans KR', sans-serif;
		color: white;
		font-size: clamp(1rem, 2.6vw, 1.4rem);
        font-weight: 300;
		line-height: 120%;
	}
`;

export default GlobalStyle;