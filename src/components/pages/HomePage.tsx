import React from 'react';
import {
  StyledHeader,
  StyledSubHeader,
  PageContainer,
  HomePageNav,
  HomePageMainContent,
  HomePageMainLeft,
  HomePageTitle,
  HomePageSubTitle,
  HomePageActions,
  HomePageButton,
} from '../__styles__/HomePageStyles';
import { Image, Menu } from 'semantic-ui-react';
import * as images from '../../assets/index';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/router/appRoutes';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleOnClick = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <PageContainer fluid data-testid="homePage-2">
        <HomePageNav>
          <Menu fluid secondary color="green">
            <Menu.Item>
              <div>
                <Image src={images.LOGOBLUE} size="medium" />
              </div>
            </Menu.Item>
            <Menu.Menu position="right">
              {/* <MenuItem name="Contact" />
              <MenuItem name="Pricing" />
              <MenuItem name="About Us" />
              <MenuItem name="Legal" /> */}
              <HomePageButton
                className="login"
                onClick={() => handleOnClick(appRoutes.LOGIN)}
                role="button"
                data-testid="login-ext-button"
              >
                Login
              </HomePageButton>
              <HomePageButton
                className="get-started"
                onClick={() => handleOnClick(appRoutes.SIGNUP)}
                role="button"
                data-testid="get-started-button"
              >
                Get Started
              </HomePageButton>
            </Menu.Menu>
          </Menu>
        </HomePageNav>
        <HomePageMainContent>
          <HomePageMainLeft>
            <HomePageTitle>
              <StyledHeader>Stop Over-Spending on Cloud Services</StyledHeader>
            </HomePageTitle>
            <HomePageSubTitle>
              <StyledSubHeader>
                A powerful and insightful software suite to explore, understand and take action on cloud services
                spending
              </StyledSubHeader>
            </HomePageSubTitle>
            <HomePageActions>
              <HomePageButton className="view-demo" role="button" data-testid="login-demo-button">
                View Demo
              </HomePageButton>
            </HomePageActions>
          </HomePageMainLeft>
        </HomePageMainContent>
      </PageContainer>
    </>
  );
};

export default HomePage;
