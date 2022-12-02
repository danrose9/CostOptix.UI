import styled from 'styled-components';
import {Icon } from 'semantic-ui-react';

export const StyledBrand = styled.div`
    height: 70px;   
`;

export const StyledSectionHeader = styled.div`
    height: 30px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-content: center;
    color: #b8e5f1;
    font-size: 1.1em;
    margin: auto;
    font-weight: 200;

`;

export const StyledMenu = styled.ul`
    padding-top: 20px;
`;

export const StyledSubMenu = styled.ul`
    padding-top: 5px;
`;

export const StyledMenuExtra = styled.ul`
    padding: 0;
`;

export const StyledMenuItem = styled.li`
     & a {
      display: block;
      font-size: inherit;
      color: #a9a9a9;
      text-decoration: none;
      text-align: left;
      padding: 0.7rem 1rem;
      &:hover {
        color: #f2f2f2;
       }
     }
     & button {
      font-family: 'Poppins', sans-serif;
      font-weight: 200;
      color: #a9a9a9;
      border: none;
      background-color: transparent;
      cursor: pointer;
      width: 100%;
      position: relative;
      text-align: left;
      padding: 0.7rem 1rem;
      &:hover {
        color: #f2f2f2;
       }
     }
     
`;

export const StyledSpan = styled.span`
  margin: 3px 0 0 20px;
`;

export const SubMenuDropdown = styled(Icon)`
  position: absolute;
  right: 1.7rem;
`;