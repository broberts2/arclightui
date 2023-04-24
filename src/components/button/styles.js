import styled from "styled-components";

const Container = styled.div`
  ${(props) => (props.span ? `width: 100%;` : null)}
`;

const FontAwesome = styled.div`
  cursor: pointer;
  display: inline-flex;
  transition: filter 0.25s ease;
  &:hover {
    -webkit-filter: brightness(150%);
    filter: brightness(150%);
  }
`;

export default {
  Container,
  FontAwesome,
};
