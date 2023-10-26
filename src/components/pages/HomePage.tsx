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
} from '../__styles__/HomePageStyles';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { BASE, DEMO_LOGIN } from '../../services/api/apiEndpoints';
import HomePageNav from '../navbar/HomePageNav';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleOnClick = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <PageContainer fluid data-testid="homePage-2" className="home-page">
        <HomePageNav />

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
              <form method="POST" action={BASE + DEMO_LOGIN}>
                <HomePageButton className="view-demo" data-testid="login-demo-button">
                  View Demo
                </HomePageButton>
              </form>
            </HomePageActions>
          </HomePageMainLeft>
        </HomePageMainContent>
      </PageContainer>
    </>
  );
};

export default HomePage;

const LoginDemo = () => {
  return (
    <form method="POST" action={BASE + DEMO_LOGIN}>
      <Button data-testid="login-demo-button">View Demo </Button>
    </form>
  );
};
