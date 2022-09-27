import styled from 'styled-components';
import Standard from './components/Standard';
import Physical from './components/Physical';
import Bloom from './components/Bloom';
import Distort from './components/Distort';
import Reflect from './components/Reflect';
import Metal from './components/Metal';
import Texture from './components/Texture';
import Lamina from './components/Lamina';

const StyledApp = styled.div`
	width: 100%;
	min-height: 100vh;
	background: black;

	@media only screen and (max-width: 599px) {
		height: 100vh;
	}
`;

const CanvasContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const CanvasWrapper = styled.div`
	width: 25%;
	height: 37.5vh;

	@media only screen and (max-width: 904px) {
		width: 50vw;
	}

	@media only screen and (max-width: 599px) {
		width: 100vw;
		height: 60vh;
		:nth-child(-n+5), :nth-child(n+7) {
			display: none;
		}
	}
`;

const DescriptionContainer = styled.div`
	width: 100%;
	min-height: 25vh;
	padding: 4rem;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	@media only screen and (max-width: 904px) {
		flex-direction: column;
		gap: 1rem;
	}

	.contentContainer {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.infoContainer {
		height: calc(25vh - 8rem);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;

		@media only screen and (max-width: 904px) {
			height: 100%;
			gap: 2.4rem;
		}

		.tagContainer {
			display: flex;
			align-items: flex-end;
			justify-content: center;
			gap: 0.8rem;

			.tag {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.4rem 0.8rem;
				border: 0.1rem solid white;
				border-radius: 10rem;
				background: black;
				color: white;
				font-family: 'Poppins', sans-serif;
				font-size: clamp(0.8rem, 0.9vw, 1.2rem);
				font-weight: 500;
				cursor: pointer;
				transition: all 0.3s ease-in-out;

				:hover {
					background: white;
					color: black;
				}
			}
		}

		span {
			font-family: 'Poppins', sans-serif;
			color: gray;
			font-size: clamp(1rem, 2.6vw, 1.4rem);
			font-weight: 100;
		}

		@media only screen and (max-width: 904px) {
			align-items: flex-start;
		}
	}

	a {
		text-decoration: none;
		color: white;
	}
`;

const MobilePopup = styled.div`
	width: 100vw;
	height: 10vh;
	background: rgb(20, 20, 20);
	display: none;

	@media only screen and (max-width: 599px) {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

function Canvases() {
	return(
		<CanvasContainer>
			<MobilePopup>
				<h2>⚠️ PC 버전에서 더 다양한 인터랙션을 확인하실 수 있습니다. ⚠️</h2>
			</MobilePopup>
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
				<Reflect />
			</CanvasWrapper>
			<CanvasWrapper>
				<Metal />
			</CanvasWrapper>
			<CanvasWrapper>
				<Texture />
			</CanvasWrapper>
			<CanvasWrapper>
				<Lamina />
			</CanvasWrapper>
		</CanvasContainer>
	);
}

export default function App() {

	return (
		<StyledApp>
			<Canvases />
			<DescriptionContainer>
				<div className="contentContainer">
					<h1>3D Materials</h1>
					<h2>다양한 3D 매터리얼을 활용한 인터랙션 디자인</h2>
				</div>
				<div className="infoContainer">
					<div className="tagContainer">
						<a href="https://reactjs.org/" target='_blank' rel='noreferrer'><div className="tag">react.js</div></a>
						<a href="https://threejs.org/" target='_blank' rel='noreferrer'><div className="tag">three.js</div></a>
						<a href="https://styled-components.com/" target='_blank' rel='noreferrer'><div className="tag">styled-components</div></a>
					</div>
					<span>designed & developed by <a href="https://hanbyeol-lee.com/" target='_blank' rel='noreferrer'>Hanbyeol Lee</a> (<a href="https://github.com/hanby-uxengineer/3d-materials" target='_blank' rel='noreferrer'>github</a>)</span>
				</div>
			</DescriptionContainer>
		</StyledApp>
	)
}