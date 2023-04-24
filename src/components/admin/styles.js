import styled from "styled-components";

const Container = styled.div``;

const Body = styled.div`
  width: 100%;
`;

const Drawer = styled.div`
  height: 100vh;
  @media only screen and (min-width: 1024px) {
    width: 300px;
  }
`;

const Content = styled.div`
  flex: 1;
`;

export default {
  Container,
  Body,
  Drawer,
  Content,
};
