import styled from "styled-components";

const Container = styled.div`
	position: relative;
	height: ${(props) => (props.headless ? "100vh" : "75vh")};
`;

const Body = styled.div`
	width: 100%;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
`;

export default {
	Container,
	Body,
};
