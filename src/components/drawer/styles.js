import styled from "styled-components";
import { mountHandler } from "../animations";

const Container = styled.div``;

const SignOut = styled.div``;

const Component = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
`;

const Item = styled.div`
  ${(props) => mountHandler(props)}
  /* Position and sizing of burger button */
	.bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    ${(props) => `${props.buttonSide ? props.buttonSide : "left"}: 36px;`}
    top: 36px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: ${(props) => (props.showBars ? "white" : "transparent")};
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: darkgray;
  }
`;

export default {
  Container,
  Item,
  SignOut,
  Component,
};
