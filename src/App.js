import styled from 'styled-components';
import Standard from './components/Standard';
import Physical from './components/Physical';
import Bloom from './components/Bloom';

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
	width: 25%;
	height: 30rem;
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
				<CanvasWrapper>
					<Standard />
				</CanvasWrapper>
			</CanvasContainer>
		</StyledApp>
	)
}