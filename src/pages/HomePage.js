import React from 'react';
import {
  StyledHeader,
  StyledSubHeader,
  PageContainer,
  HomePageNav,
  HomePageMainContent,
  HomePageFooter,
  HomePageMainLeft,
  HomePageTitle,
  HomePageSubTitle,
  HomePageActions,
} from './__styles__/HomePageStyles';
import { GetStartedModal } from '../components/modals/GetStartedModal';
import { Login, LoginDemo } from '../components/auth/Login';
import { Image, Menu } from 'semantic-ui-react';
import * as images from '../assets/index';

export const HomePage = () => {
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
              <Menu.Item>
                <Login disabled={false} primary={false} content="Login" size="big" color="black" />
              </Menu.Item>
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
              <GetStartedModal action="Get Started" />
              <LoginDemo
                style={{ fontSize: '1.7em' }}
                disabled={false}
                primary={true}
                size="huge"
                content="View Demo"
              />
            </HomePageActions>
          </HomePageMainLeft>
        </HomePageMainContent>
        <HomePageFooter></HomePageFooter>
      </PageContainer>
    </>
  );
};

export default HomePage;
