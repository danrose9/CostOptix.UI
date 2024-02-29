import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { FONT } from '../../../app/constants';

export const StyledBrand = styled.div`
  height: 70px;
`;

export const StyledSectionHeader = styled.div`
  height: 30px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  color: ${FONT.PRIMARY_COLOR};
  font-size: 1.1em;
  margin: auto;
  font-weight: 200;
`;

export const StyledMenu = styled.ul`
  padding-top: 20px;
  &.light {
    padding-top: 0;
  }
`;

export const StyledSubMenu = styled.ul`
  padding-top: 5px;
`;

export const StyledMenuExtra = styled.ul`
  padding: 0;
`;

export const StyledMenuItem = styled.li`
  list-style: none;

  &.light {
    * {
      color: ${FONT.SECONDARY_COLOR};
      font-weight: 400;
      &:hover {
        background-color: ${FONT.TERNANY_HOVER};
      }
    }
  }

  & a {
    display: block;
    font-size: inherit;
    color: ${FONT.TERNARY_COLOR};
    text-decoration: none;
    text-align: left;
    padding: 0.7rem 1rem;
    &:hover {
      color: ${FONT.TERNANY_HOVER};
    }
  }
  & button {
    color: ${FONT.TERNARY_COLOR};
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 100%;
    position: relative;
    text-align: left;
    padding: 0.7rem 1rem;
    height: 3em;
    &:hover {
      color: ${FONT.TERNANY_HOVER};
    }
    & icon {
      right: 0.5em;
    }
  }
`;

export const StyledSpan = styled.span`
  margin: 3px 0 0 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 200;
  &.light {
    margin: 0;
  }
`;

export const SubMenuDropdown = styled(Icon)`
  position: absolute;
  right: 1.7rem;
`;
