import styled from 'styled-components';
import { Container, Menu, Card as SemanticCard, Message as SemanticMessage } from 'semantic-ui-react';
import backgroundImage from '../../assets/home-background.png';
import { EXTERNAL_BACKGROUND } from 'src/assets/index';
import { COLORS, FONT } from '../../app/constants';

export const PageContainer = styled(Container)`
  overflow: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
`;

export const LegalDocumentWrapper = styled.div`
  margin: 3em 0 15em;
  ul {
    padding: 0 0 0 2em;
  }
`;

export const HomePageMainContent = styled.div`
  height: 87%;
  display: flex;
  justify-content: space-between;
  overflow: auto;

  &.center {
    justify-content: center;
  }
  @media only screen and (max-width: 600px) {
    overflow: unset;
    
  }
`;

export const ExternalPageWrapper = styled.div`
  height: 90vh;
  overflow-y: scroll;
  background-color: ${COLORS.BACKGROUND};
  &.external-page {
    background-image: url(${EXTERNAL_BACKGROUND});
    background-size: cover;
  }
`;

export const StyledHeader = styled.h1`
  color: #5f6675;
  font-size: calc(2vw + 2vh + 1vmin);
  padding: 10px;
  @media only screen and (max-width: 600px) {
      font-size: 2.5em;
      color: ${FONT.PRIMARY_COLOR};
  }

`;

export const StyledSubHeader = styled.p`
  font-size: 1.8em;
  color: #5f6675;
  font-size: 2em;
    @media only screen and (max-width: 600px) {
      font-size: 1.5em;
      font-weight: 400;
      font-size: 2.5em;
  }
`;

export const HomePageWrapper = styled.div`
  width: auto;
  height: 90vh;
  overflow-x: hidden;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: top;
`;

export const HomePageMainLeft = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
      width: 100%;
  }
`;

export const HomePageTitle = styled.div`
  padding: 30px;
  flex-grow: 3;
  @media only screen and (max-width: 600px) {
      width: 100%;
      flex-grow: 1;
  }
`;

export const Message = styled(SemanticMessage)`
  margin: 0 !important;
`;

export const HomePageSubTitle = styled.div`
  padding: 0 40px;
  flex-grow: 4;
  font-size: calc(0.5vw + 0.5vh + 0.5vmin);
  @media only screen and (max-width: 600px) {
      padding: 5em;
      line-height: 1.5em;
  }
`;

export const HomePageActions = styled.div`
  flex-grow: 3;
  padding: 0 1.5em;
  display: flex;
`;

export const MenuItem = styled(Menu.Item)`
  font-size: 1.3em;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  padding-right: 2em !important;
  cursor: pointer;
`;

export const HomePageButton = styled.button`
  font-size: 1.3em;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  padding: 0.9em;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  height: 3em;
  margin: 1em;
  width: 10em;
  align-items: center;
  border: none;
  position: relative;
  
  &.transparent {
    background-color: transparent;
    color: ${COLORS.BUTTONS.PRIMARY};
    border: none;
    &:hover {
      color: ${COLORS.BUTTONS.PRIMARY_HIGHLIGHT};
    }
  }

  &.shift-right {
    width: 4em;
  }

  &.get-started {
    background-color: ${COLORS.BUTTONS.POSITIVE};
    color: ${COLORS.WHITE};
    &:hover {
      background-color: ${COLORS.BUTTONS.POSITIVE_HIGHLIGHT};
    }
  }

  &.view-demo {
    background-color: ${COLORS.BUTTONS.POSITIVE};
    color: ${COLORS.WHITE};

    &:hover {
      background-color: ${COLORS.BUTTONS.POSITIVE_HIGHLIGHT};
    }
  }

    &.book-demo {
    background-color: ${COLORS.BUTTONS.PRIMARY};
    color: ${COLORS.WHITE};

    &:hover {
      background-color: ${COLORS.BUTTONS.PRIMARY_HIGHLIGHT};
    }
  }

  &.login {
    border: 1px solid ${COLORS.BUTTONS.BORDER};
    color: ${COLORS.BUTTONS.PRIMARY};
    
    &:hover {
      border-color: #8B8B8B;
    }
  }
`;

export const Segment = styled.div`
  flex: 1;
  text-align: center;
  padding: 0 0 5em;
`;

export const FormContainer = styled.div`
  width: 80%;
  align-self: center;
  padding: 4vh 0;
  * label {
    font-weight: 400 !important;
    text-align: left !important;
    padding-left: 0.2em;
  }
  * input {
    border-radius: 5px !important;
    margin: 0 0 1em 0 !important;
  }
  * button {
    background-color: ${COLORS.BUTTONS.PRIMARY} !important;
    color: ${FONT.WHITE} !important;
    border-radius: 5px !important;
    padding: 1em 2em !important;
    margin: 2em 0 !important;
    width: 100% !important;
  }
  .ui.form .field {
    text-align: left !important;
  }
  &.full-width {
    width: 100% !important;
  }
  &.reduce-padding { padding: 2vh 0;}
`;

export const ContactCard = styled(SemanticCard)`
  width: auto !important;
  border-radius: 25px !important;
  box-shadow: 0 0 10px 0 ${COLORS.PRIMARY} !important;
  overflow: hidden;
`;

export const ContactCardHeader = styled.div`
  background-color: ${COLORS.PRIMARY};
  height: 7em;

  & > p {
    color: ${FONT.TERNARY_COLOR} !important;
    font-size: 1.8em;
    padding: 0.5em;
  }
`;

export const DescriptionContainer = styled.div`
  padding: 1em 4em 0 0;
  text-align: left;
  color: ${FONT.PRIMARY_COLOR} !important;
  p {
    font-size: 1.3em;
    padding: 0.4em 0;
  }
  ul {
    padding: 0 0 0 2em;
  }
  li {
    padding: 0 1em 0.5em 1em;
  }
`;