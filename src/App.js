import styled from 'styled-components';
import Standard from './components/Standard';
import Physical from './components/Physical';
import Bloom from './components/Bloom';
import Distort from './components/Distort';

const StyledApp = styled.div`
	width: 100%;
	min-height: 100vh;
	background: black;
`;

const CanvasContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const CanvasWrapper = styled.div`
	width: 25vw;
	height: 30rem;

	@media only screen and (max-width: 904px) {
		width: 50vw;
	}

	@media only screen and (max-width: 599px) {
		width: 100vw;
	}
`;

export default function App() {

	return (
		<StyledApp>
			<CanvasContainer>
				<CanvasWrapper>
					<Standard />
				</CanvasWrapper>
				<CanvasWrapper>
					<Physical />
				</CanvasWrapper>
				<CanvasWrapper>
					<Bloom />
				</CanvasWrapper>
				<CanvasWrapper>
					<Distort />
				</CanvasWrapper>
				<CanvasWrapper>
					<Standard />
				</CanvasWrapper>
				<CanvasWrapper>
					<Standard />
				</CanvasWrapper>
				<CanvasWrapper>
					<Standard />
				</CanvasWrapper>
				<CanvasWrapper>
					<Standard />
				</CanvasWrapper>
			</CanvasContainer>
		</StyledApp>
	)
}