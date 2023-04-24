import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  height: 800px;
  @media only screen and (max-width: 1024px) {
    height: 300px;
  }
`;

const Divider = styled.div`
  position: absolute;
  top: -10%;
  left: -10%;
  width: 125%;
  height: 100%;
  transform: rotate(${(props) => props.rotation}deg);
  transform-origin: bottom right;
  overflow: hidden;
  & img {
    transform: rotate(-${(props) => props.rotation}deg);
  }
`;

export default {
  Container,
  Divider,
};
