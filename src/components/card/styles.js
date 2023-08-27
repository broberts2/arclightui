import styled from "styled-components";
import { mountHandler } from "../animations";
//import tw from "twin.macro";

const Container = styled.div`
  ${(props) => mountHandler(props)}
  height: 32rem;
  @media only screen and (max-width: 1024px) {
    height: ${(props) => (props.bodyComponent ? "50vh" : "12rem")};
  }
  position: relative;
  ${(props) =>
    props.medium
      ? `
			height: 18rem;
			@media only screen and (max-width: 1024px) {
				height: 12rem;
			}
		`
      : null}
  ${(props) =>
    props.small
      ? `
			width: 10rem;
			height: 8rem;
			@media only screen and (max-width: 1024px) {
				height: 8rem;
			}
		`
      : null}
	${(props) =>
    props.line
      ? `
	  		margin: 12px;
			width: 100%;
			height: 6rem;
			@media only screen and (max-width: 1024px) {
				height: 6rem;
			}
		`
      : null}
			${(props) =>
    props.linesmall
      ? `
			margin: 10px;
			width: 100%;
			height: 3rem;
			@media only screen and (max-width: 1024px) {
				height: 3rem;
			}
		`
      : null}
	${(props) =>
    props.max
      ? `
			height: unset;
			width: 85%;
			max-width: 1280px;
			min-height: 24rem;
		`
      : null}
	${(props) =>
    props.modal
      ? `
			height: 65vh;
			width: 65vw;
		`
      : null}
`;

const Back = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${(props) => props.borderRadius};
`;

const Front = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${(props) => props.borderRadius};
  overflow: hidden;
`;

const BgImg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  ${(props) =>
    props.line || props.linesmall
      ? `
			width: 75%;
			right: 0;
		`
      : null}
  transition: all ease 0.25s;
`;

const BgImgChild = styled.img`
  ${(props) =>
    props.line || props.linesmall
      ? `
		-webkit-mask-image: -webkit-gradient(
			linear,
			right top,
			left bottom,
			from(rgba(0, 0, 0, 1)),
			to(rgba(0, 0, 0, 0))
		);
		`
      : null}
`;

const LockContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const TabNumberWrapper = styled.div`
  transform-origin: center;
  position: absolute;
  width: 200%;
  height: 50%;
  top: -25%;
  left: -100%;

  transform: rotate(-45deg) translate(-25%);
`;

const TabNumber = styled.div`
  position: absolute;
  top: 0;
  left: 5px;
`;

const BodyComponent = styled.div`
  position: relative;
  ${(props) =>
    !props.noabsolute
      ? `position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 100%;`
      : null}
`;

export default {
  BodyComponent,
  Container,
  Front,
  Back,
  BgImg,
  LockContainer,
  TabNumber,
  TabNumberWrapper,
  BgImgChild,
};
