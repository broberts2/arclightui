import styled from "styled-components";
import { mountHandler } from "../animations";

const Container = styled.div`
	width: 100%;
	overflow-x: hidden;
`;

const ViewItem = styled.div`
	max-height: 800px;
`;

const TdLg = styled.td`
	opacity: ${(props) => (props.expanded ? "1" : "0")};
	width: ${(props) => (props.expanded ? "100%" : "0%")};
	transition: all ease 0.5s;
	overflow-x: hidden;
	@media only screen and (max-width: 1280px) {
		display: none;
	}
`;

const TdSm = styled.td`
	opacity: ${(props) => (props.expanded ? "1" : "0")};
	width: ${(props) => (props.expanded ? "100%" : "0%")};
	transition: all ease 0.5s;
	overflow: hidden;
`;

const Item = styled.div`
	${(props) => mountHandler(props)}
`;

export default {
	Container,
	ViewItem,
	TdLg,
	TdSm,
	Item,
};
