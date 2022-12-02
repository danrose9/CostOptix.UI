import styled from 'styled-components';
import { Container, Menu } from 'semantic-ui-react';
import backgroundImage from '../../assets/home-background.png';

export const PageContainer = styled(Container)`
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export const HomePageNav = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

export const HomePageMainContent = styled.div`
  height: 87%;
  display: flex;
  justify-content: space-between;
`;

export const HomePageFooter = styled.div`
  height: 3%;
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
  width: 40%;
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
  flex-grow: 4;
  display: flex;
  justify-content: space-evenly;
`;

export const MenuItem = styled(Menu.Item)`
  font-size: 1.7em;  
  padding-right: 2em !important;
  cursor: pointer;
`;

export const MenuMenu = styled(Menu.Menu)`
  
`;