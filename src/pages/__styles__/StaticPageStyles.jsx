import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

export const PageContainer = styled(Container)`
overflow: hidden;
height: 100%;
display: flex;
flex-direction: column;
background-repeat: no-repeat;
background-size: 100% 100%;
`;

export const PageContent = styled.div`
position: absolute;
width: 400px;
height: 200px;
z-index: 15;
top: 40%;
left: 80%;
margin: -100px 0 0 -150px;
text-align: center;
`;

export const PageTitle = styled.h1`
font-size: 3rem;
padding: 30px;
`;

export const PageDescription = styled.p`
font-size: 1.7rem;
`;