import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  height: 0px;
  top: 50vh;
  z-index: 9999;
`;

const Loader = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default {
  Container,
  Loader,
};
