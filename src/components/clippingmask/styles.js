import styled from "styled-components";

const Canvas = styled.canvas`
  transition: all 0.25s ease-in;
  opacity: ${(props) => props.opacity};
  opacity: 0;
`;

export default {
  Canvas,
};
