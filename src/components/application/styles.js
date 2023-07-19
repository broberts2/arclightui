import styled from "styled-components";
import { mountHandler } from "../animations";

const Container = styled.div`
	${(props) => mountHandler(props)}
`;

const Body = styled.div`
	min-height: 100vh;
	background-color: white;
	border-radius: 3px;
	text-align: center;
	position: relative;
	overflow: hidden;
`;

const BackgroundImage = styled.div`
	top: 0;
	left: 0;
	position: absolute;
	opacity: 1;
	width: 100%;
`;

const Nopage = styled.img`
	width: 100%;
	object-fit: cover;
`;

const TitleImg = styled.div`
	overflow: hidden;
	border-radius: 50%;
	margin: auto;
	& img {
		height: 100%;
		object-fit: cover;
	}
`;

const Title = styled.div``;

const Text = styled.div``;

const Link = styled.a`
	color: blue;
	border-bottom: 1px solid blue;
`;

const Description = styled.div`
	text-shadow: none;
	text-align: left;
`;

const Input = styled.div`
	text-shadow: none;
`;

const Controls = styled.div`
	text-align: left;
`;

export default {
	Container,
	Link,
	Text,
	Description,
	Input,
	Controls,
	Title,
	TitleImg,
	Nopage,
	Body,
	BackgroundImage,
};
