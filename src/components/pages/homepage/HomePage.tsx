import React from 'react';
import {
  StyledHeader,
  StyledSubHeader,
  PageContainer,
  HomePageMainContent,
  HomePageMainLeft,
  HomePageTitle,
  HomePageSubTitle,
  HomePageActions,
  HomePageButton,
} from '../../__styles__/HomePageStyles';
import { BASE, DEMO_LOGIN } from '../../../services/api/apiEndpoints';
import HomePageNav from './HomePageNav';
import { AppDispatch } from 'src/services/redux/store';
import { useDispatch } from 'react-redux';
import { setIsDemo } from '../../../services/redux/reducers/userProfileSlice';
import CookieBanner from '../../CookieBanner';

export const HomePage = () => {
  const dispatch = useDispatch();

  const handleDemoClick = () => {
    dispatch<AppDispatch>(setIsDemo(true));
  };

  return (
    <>
      <PageContainer fluid data-testid="homePage-2" className="home-page">
        <HomePageNav />

        <HomePageMainContent>
          <HomePageMainLeft>
            <HomePageTitle>
              <StyledHeader>Reduce Your Cloud Spending Costs Effectively with CostOptix</StyledHeader>
            </HomePageTitle>
            <HomePageSubTitle>
              <StyledSubHeader>
                A powerful and insightful software suite to explore, understand and take action on cloud services
                spending
              </StyledSubHeader>
            </HomePageSubTitle>
            <HomePageActions>
              <form method="POST" action={BASE + DEMO_LOGIN}>
                <HomePageButton className="view-demo" data-testid="login-demo-button" onClick={handleDemoClick}>
                  View Demo
                </HomePageButton>
              </form>
            </HomePageActions>
          </HomePageMainLeft>
          <CookieBanner />
        </HomePageMainContent>
      </PageContainer>
    </>
  );
};

export default HomePage;
