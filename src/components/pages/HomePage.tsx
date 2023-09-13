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
import { LoginButton, LoginDemoButton, SignupButton } from '../auth/AuthButtons';
import { Button, Image, Menu } from 'semantic-ui-react';
import * as images from '../../assets/index';
import AuthPage from '../auth/AuthPage';

export const HomePage = () => {
  const handleOnClick = () => {
    console.log('clicked');
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
              <HomePageButton className="login" onClick={handleOnClick} role="button">
                Login
              </HomePageButton>
              <HomePageButton className="get-started" role="button">
                Get Started
              </HomePageButton>

              {/* <Menu.Item>
                <SignupButton disabled={false} primary={false} content="Signup" size="big" color="green" />
                <LoginButton disabled={false} primary={false} content="Login" size="big" color="black" />
              </Menu.Item> */}
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
              {/* <LoginDemoButton disabled={false} secondary size="big" content="View Demo" /> */}
              <HomePageButton className="view-demo" role="button">
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
