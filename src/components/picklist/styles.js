import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	${(props) => (!props.span ? `max-width: 400px;` : null)}
	&::-webkit-scrollbar {
		display: none;
	}
`;

const SearchControls = styled.div``;

export default {
	Container,
	SearchControls,
};
