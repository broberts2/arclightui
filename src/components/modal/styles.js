import styled from "styled-components";
import { mountHandler } from "../animations";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

const Element = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

export default {
  Container,
  Element,
  Backdrop,
};
