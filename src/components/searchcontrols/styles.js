import styled from "styled-components";

const Container = styled.div`
	position: relative;
	height: 100%;
	${(props) => (!props.picklist ? `min-height: 600px;` : "")}
`;

const Children = styled.div`
	overflow-y: auto;
	overflow-x: hidden;
`;

export default {
	Container,
	Children,
};
