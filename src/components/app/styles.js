import styled from "styled-components";

const Container = styled.div`
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	@tailwind variants;

	@font-face {
		font-family: "RussoOne-Regular";
		src: url("fonts/RussoOne-Regular.ttf");
	}

	.nopage {
		z-index: 0;
		position: absolute;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.nopage img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.reactive-btn-wrapper,
	.reactive-btn {
		--reactive-button-min-width: 0px !important;
		--reactive-button-min-height: 35px !important;
		--reactive-button-font-weight: 400 !important;
		--reactive-button-border-radius: 0px !important;
		--reactive-button-text-color: rgb(
			255 255 255 / var(--tw-bg-opacity)
		) !important;
		--reactive-progress-color: rgba(0, 0, 0, 0.15) !important;
		--reactive-button-primary-color: rgb(
			141 0 222 / var(--tw-bg-opacity)
		) !important;
		--reactive-progress-outline-primary-color: rgba(
			88,
			103,
			221,
			0.3
		) !important;
	}

	.reactive-btn-wrapper:hover,
	.reactive-btn:hover {
		opacity: 1;
	}

	body {
		overflow-y: overlay;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
			1px 1px 0 #000;
	}
	::-webkit-scrollbar {
		width: 10px;
		margin-right: 100px;
	}
	::-webkit-scrollbar-button {
		height: 0;
		width: 0;
	}
	::-webkit-scrollbar-track {
		position: absolute;
		right: -3rem;
		top: -50rem;
		background: transparent;
	}
	::-webkit-scrollbar-track:hover {
		background-color: transparent;
	}
	::-webkit-scrollbar-track:active {
		background-color: transparent;
	}
	::-webkit-scrollbar-thumb {
		background-color: #cccccc;
		background-clip: padding-box;
		border: solid transparent;
		border-width: 1px 1px 1px 0px;
		min-height: 28px;
		padding: 0px 0 0;
		border-radius: 4px;
	}
	::-webkit-scrollbar-thumb:hover {
		background-color: #999999;
	}
	::-webkit-scrollbar-thumb:active {
		background-color: #808080;
	}
`;

export default {
	Container,
};
