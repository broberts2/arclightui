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
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
  }

  /*
	Sidebar wrapper styles
	Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
	*/
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export default {
  Container,
  Item,
  SignOut,
  Component,
};
