import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Body = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const BaseBackground = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.1;
  object-fit: cover;
  transition: all ease 0.5s;
`;

const HoverBackground = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  object-fit: cover;
  transition: all ease 0.5s;
`;

export default {
  Container,
  Body,
  BaseBackground,
  HoverBackground,
};
