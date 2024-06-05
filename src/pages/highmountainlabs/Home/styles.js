import styled from "styled-components";
import { mountHandler } from "../../../components/animations";

const ImgContainer = styled.div`
  ${(props) => mountHandler(props)}
  opacity: 0;
`;

const TextContainer = styled.div`
  ${(props) => mountHandler(props)}
  opacity: 0;
`;

const Cursor = styled.div`
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  animation: blink 0.5s linear infinite;
`;

export default { TextContainer, ImgContainer, Cursor };
