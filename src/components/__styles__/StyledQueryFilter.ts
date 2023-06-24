import styled from 'styled-components';
import { Input, Dropdown } from 'semantic-ui-react';

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

  &.show-horizontal-connector :before,
  &.show-vertical-connector :after {
    content: '';
    position: absolute;
    left: -18px;
    top: 50%;
    height: 1px;
    width: 18px;
    background-color: #ccc;
  }

  &.show-horizontal-connector :before {
    top: 14px;
    height: 1px;
    border-width: 0 0 2px 2px;
  }

  &.show-vertical-connector :after {
    top: 10%;
    height: calc(50% + 25px);
    width: 1px;
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
