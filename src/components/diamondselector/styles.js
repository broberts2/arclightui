import styled from "styled-components";

const fullWidth = "600px";
const smallWidth = "300px";
const breakPoint = "1280px";

const Container = styled.div`
  position: relative;
  width: ${fullWidth};
  height: ${fullWidth};
  margin-left: calc(${fullWidth} * 0.1);
  margin-right: calc(${fullWidth} * 0.1);
  margin-top: calc(${fullWidth} * 0.1);
  margin-bottom: calc(${fullWidth} * 0.1);
  @media only screen and (max-width: ${breakPoint}) {
    width: ${smallWidth};
    height: ${smallWidth};
    margin-left: calc(${smallWidth} * 0.1);
    margin-right: calc(${smallWidth} * 0.1);
    margin-top: calc(${smallWidth} * 0.1);
    margin-bottom: calc(${smallWidth} * 0.1);
  }
  border-radius: 50%;
  background-color: rgb(40, 44, 52);
`;

const DiamondWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  transform: ${(props) => props.translate};
  cursor: pointer;
`;

const Diamond = styled.div`
  position: relative;
  transform-origin: center;
  width: calc(${fullWidth} * ${(props) => (props.lg ? "0.7" : "0.405")});
  height: calc(${fullWidth} * ${(props) => (props.lg ? "0.7" : "0.405")});
  @media only screen and (max-width: ${breakPoint}) {
    width: calc(${smallWidth} * ${(props) => (props.lg ? "0.7" : "0.405")});
    height: calc(${smallWidth} * ${(props) => (props.lg ? "0.7" : "0.405")});
  }
  overflow: hidden;
  transform: rotate(-45deg);
  transition: all 0.25s ease;
  ${(props) => (props.lg ? "z-index: 5" : null)}
  opacity: ${(props) =>
    props.focus
      ? props.focus === props.i + 1
        ? 1
        : 0.25
      : props.selected === props.i + 1 || props.selected === 0
      ? 1
      : 0.25};
  &:hover {
    opacity: ${(props) =>
      props.focus
        ? props.focus === props.i + 1
          ? 1
          : 0.65
        : props.selected === props.i + 1 || props.selected === 0
        ? 1
        : 0.65};
  }
`;

const DiamondContent = styled.div`
  position: relative;
  width: 150%;
  height: 150%;
  transform: rotate(45deg);
  margin-left: -25%;
  margin-top: -25%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BgElement = styled.video`
  position: absolute;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  border-radius: 50%;
  opacity: 1;
`;

export default {
  Container,
  Diamond,
  DiamondWrapper,
  Image,
  DiamondContent,
  BgElement,
};
