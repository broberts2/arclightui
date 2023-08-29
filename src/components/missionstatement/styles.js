import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const BgImg = styled.img`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 50%;
  transform: translateY(50%);
  object-fit: fill;
`;

export default {
  Container,
  BgImg,
};
