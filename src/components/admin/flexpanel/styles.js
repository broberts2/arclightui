import styled from "styled-components";
import { mountHandler } from "../../animations";

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;

const Item = styled.div`
	${(props) => mountHandler(props)}
	width: 100%;
	max-width: 99%;
	max-height: 99%;
	position: relative;
`;

const NoSelect = styled.div`
	${(props) => mountHandler(props)}
	width: 100%;
	height: 100%;
	display: flex;
`;

const ItemContent = styled.div``;

const Table = styled.table`
	width: 100%;
`;

const BgImg = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0.05;
	object-fit: cover;
	pointer-events: none;
`;

export default {
	Container,
	Item,
	Table,
	ItemContent,
	NoSelect,
	BgImg,
};
