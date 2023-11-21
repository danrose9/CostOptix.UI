import styled from 'styled-components';
import { Container, Menu } from 'semantic-ui-react';
import backgroundImage from '../../assets/home-background.png';
import { COLORS } from '../../app/constants';

export const PageContainer = styled(Container)`
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &.home-page {
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: 100%;
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
`;

export const StyledHeader = styled.h1`
  color: #5f6675;
  font-size: calc(2vw + 2vh + 1vmin);
  padding: 10px;
`;

export const StyledSubHeader = styled.p`
  font-size: 1.8em;
  color: #5f6675;
  font-size: 2em;
`;

export const HomePageMainLeft = styled.div`
  width: 43%;
  display: flex;
  flex-direction: column;
`;

export const HomePageTitle = styled.div`
  padding: 30px;
  flex-grow: 3;
`;

export const HomePageSubTitle = styled.div`
  padding: 0 40px;
  flex-grow: 4;
  font-size: calc(0.5vw + 0.5vh + 0.5vmin);
`;

export const HomePageActions = styled.div`
  flex-grow: 3;
  position: relative;
  left: 3em;
`;

export const MenuItem = styled(Menu.Item)`
  font-size: 1.7em;  
  padding-right: 2em !important;
  cursor: pointer;
`;

export const MenuMenu = styled(Menu.Menu)`
  
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
    border: 1px solid #C4C4C4;
    color: ${COLORS.BUTTONS.PRIMARY};
    
    &:hover {
      border-color: #8B8B8B;
    }
  }
`;
