import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  ${(props) => (!props.span ? `max-width: 400px;` : null)}
`;

export default {
  Container,
};
