import styled from "styled-components";

const Smoke = styled.div`
  @keyframes smoke {
    0% {
      opacity: 0;
      transform: scale(0.5, 0.5);
    }
    75% {
      opacity: 1;
    }
    100% {
      transform: scale(1.5, 1) skew(0deg, -15deg);
      opacity: 0;
    }
  }
  & img {
    filter: sepia(100%);
    -webkit-filter: sepia(100%);
    opacity: 0;
    transform-origin: 40% 100%;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`;

export default {
  Smoke,
};
