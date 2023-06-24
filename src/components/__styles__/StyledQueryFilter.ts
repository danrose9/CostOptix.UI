import styled from 'styled-components';
import { Input, Dropdown, Grid } from 'semantic-ui-react';

export const StyledGrid = styled(Grid)`
  margin-bottom: -2rem;
`;

export const StyledResult = styled.div`
  display: block;
  font-family: monospace;
  white-space: pre;
  margin: 1em 0;
`;
export const StyledInput = styled(Input)`
  border: 1px;
`;

export const StyledFilterGroup = styled.div`
  padding: 1em;
  display: flex;
  margin-left: 50px;
  // position: relative;
`;

export const StyledDropdown = styled(Dropdown)`
  z-index: 1;

  &:after {
    z-index: 1000;
  }
`;

export const StyledFieldContainer = styled.div`
  padding: 0 1em 0 0;
  position: relative; /* Added position relative */

  &.show-connector :before {
    content: '';
    position: absolute;
    left: -24px;
    top: 50%;
    height: 1px;
    width: 24px;
    background-color: #ccc;
  }

  &.show-connector:before {
    content: '';
    position: absolute;
    left: -18px;
    top: 45%;
    bottom: 0; /* Added bottom: 0 */
    width: 1px; /* Changed width to 1px */
    background-color: #ccc;
  }

  &.show-connector:after {
    content: '';
    position: absolute;
    left: -18px;
    top: 70%;
    bottom: -40%; /* Added bottom: 0 */
    width: 1px; /* Changed width to 1px */
    background-color: #ccc;
  }
`;

export const ComponentContainer = styled.div`
  display: flex;
  padding: 0.5em 0 1em;
`;

export const StyledActionGroup = styled.div`
  padding: 5px;
  display: flex;
`;
