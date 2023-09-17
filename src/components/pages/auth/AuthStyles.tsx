import styled from 'styled-components';

export const PageContainer = styled.div`
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f1f4f5;
`;

export const ImageContainer = styled.div`
  margin: 3em auto;
  display: flex;
  justify-content: center;

  & > img {
    /* target direct child images */
    max-width: 100%; /* ensure images don't overflow their container */
  }
`;

export const InputContainer = styled.div`
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  height: 60%;
  margin: 0 30%;
  display: block;
  background-color: #f5f5f5;
  width: auto;
  position: relative;

  &.login-form {
    width: 28%;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    /* tablet and below */
    height: auto;
    margin: 2% 5%;
  }
`;

export const TermsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em;
  & a {
    padding: 0 3em;
  }
`;

export const StyledGrid = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    /* tablet and below */
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledColumn = styled.div`
  padding: 3em;
  width: 70%;
  display: flex;
  flex-direction: column;

  &.full-width {
    width: 100%;
  }

  @media (max-width: 768px) {
    /* tablet and below */
    width: 100%;
    padding: 1em;
  }
  @media (max-height: 768px) {
    /* screen 1366 x 768 (HD) */
    width: 90%;
    padding: 1em 3em;
  }
`;

export const WelcomeDescription = styled.p`
  margin: 1em 0;
  padding: 1em;
`;

export const IdpContainer = styled.div`
  padding: 4em 0;

  @media (max-height: 864px) {
    width: 100%;
    padding: 2em 0;
  }
`;

export const LoginContainer = styled.a`
  cursor: pointer;
  padding: 2em 0;
  align-self: center;
  position: absolute;
  bottom: 0.3em;

  @media (max-height: 768px) {
    /* screen 1366 x 768 (HD) */
    padding: 0;
  }
`;
