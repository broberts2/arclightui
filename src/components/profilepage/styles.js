import styled from "styled-components";

const Container = styled.div`
  margin-top: 350px;
`;

const ProfileImg = styled.div`
  pointer-events: none;
  z-index: 1;
  top: -350px;
  left: 50%;
  width: 350px;
  height: 350px;
  @media only screen and (max-width: 1024px) {
    width: 225px;
    height: 225px;
    top: -225px;
  }
  transform: translate(-50%, 50%);
  border-radius: 50%;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Content = styled.div``;

export default { Container, ProfileImg, Content };
