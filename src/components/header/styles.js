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

const LinkText = styled.div`
  z-index: 1;
`;

const LinkTextsilhouette = styled.div`
  z-index: 0;
  position: absolute;
  pointer-events: none;
  text-shadow: none;
`;

export default {
  Container,
  Td,
  LinkText,
  LinkTextsilhouette,
};
