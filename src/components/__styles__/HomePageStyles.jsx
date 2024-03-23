import styled from 'styled-components';
import { Container, Menu } from 'semantic-ui-react';
import backgroundImage from '../../assets/home-background.png';
import { COLORS, FONT } from '../../app/constants';

export const PageContainer = styled(Container)`
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &.home-page {
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

    @media only screen and (max-width: 600px) {
      background-image: none;
      background-color: ${COLORS.BACKGROUND};
      margin: unset !important;
    }
  }
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

export const HomePageMainLeft = styled.div`
  width: 43%;
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
  position: relative;
  left: 3em;
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
  width: 8em;
  align-items: center;
  border: none;
  
  &.transparent {
    background-color: transparent;
    color: ${COLORS.BUTTONS.PRIMARY};
    border: none;
    &:hover {
      color: ${COLORS.BUTTONS.PRIMARY_HIGHLIGHT};
    }
  }

  &.shift-right {
    padding: 0.9em;
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

  &.login {
    border: 1px solid ${COLORS.BUTTONS.BORDER};
    color: ${COLORS.BUTTONS.PRIMARY};
    
    &:hover {
      border-color: #8B8B8B;
    }
  }
`;
