import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const Img = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default {
  Container,
  Img,
};
