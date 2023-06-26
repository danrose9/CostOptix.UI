import styled from 'styled-components';
import { Input, Dropdown, Grid } from 'semantic-ui-react';

export const StyledGrid = styled(Grid)`
  margin: 0.7em !important;
  &.indent-right {
    padding-left: 1em;
    margin: 0.5em 0;
  }

  &.filter-operator {
    margin: 0 -30px !important;
  }

  &.query-result {
    position: fixed; // New - set the position to fixed
    bottom: 0; // New - position it at the bottom of the page
  }
`;

export const StyledInput = styled(Input)`
  border: 1px;
  max-height: 2.5em;
`;

export const StyledDropdown = styled(Dropdown)`
  z-index: 1;

  &:after {
    z-index: 1000;
  }
`;

export const StyledFilterGroup = styled.div`
  display: flex;
  margin-left: 50px;
  // position: relative;
`;

export const StyledFieldContainer = styled.div`
  padding: 0 1em 0 0;
  position: relative; /* Added position relative */
  margin: 0;

  &.show-vertical-connector:before {
    content: '';
    position: absolute;
    left: 35px;
    top: 40%;
    height: calc(100% + 25px); /* Adjust the height as needed */
    width: 1px;
    background-color: #ccc;
  }

  // &.show-vertical-connector:before {
  //   content: '';
  //   position: absolute;
  //   left: -24px;
  //   top: 50%;
  //   height: 1px;
  //   width: 24px;
  //   background-color: #ccc;
  // }

  // &.show-vertical-connector:before {
  //   content: '';
  //   position: absolute;
  //   left: -18px;
  //   top: 45%;
  //   bottom: 0; /* Added bottom: 0 */
  //   width: 1px; /* Changed width to 1px */
  //   background-color: #ccc;
  // }

  // &.show-connector:after {
  //   content: '';
  //   position: absolute;
  //   left: -18px;
  //   top: 70%;
  //   bottom: -40%; /* Added bottom: 0 */
  //   width: 1px; /* Changed width to 1px */
  //   background-color: #ccc;
  // }
`;

export const ComponentContainer = styled.div`
  display: flex;
  padding: 0.5em 0 1em;
`;

export const StyledActionGroup = styled.div`
  padding: 2px;
  display: flex;
`;

export const StyledResult = styled.div`
  display: block;
  font-family: monospace;
  white-space: pre;
  margin: 1em 0;
`;

export const StyledFilterOutput = styled(Grid)`
  position: fixed;
  bottom: 20px;
  left: 250px;
  right: 20px;
`;
