import styled from "styled-components";

const Container = styled.div`
	text-shadow: none;
`;

const Body = styled.div`
	background-color: white;
`;

const Document = styled.iframe`
	margin: auto;
`;

const Author = styled.div`
	text-align: right;
	font-family: inherit;
`;

export default {
	Container,
	Document,
	Body,
	Author,
};
