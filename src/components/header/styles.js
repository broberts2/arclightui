import styled from "styled-components";

const Container = styled.div`
  position: relative;
  z-index: 40;
`;

const Td = styled.td`
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

export default {
  Container,
  Td,
};
