import styled from 'styled-components';
import { Input, Dropdown, Grid, Button, Container } from 'semantic-ui-react';

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
  width: 100%;
  white-space: nowrap !important;

  &:after {
    z-index: 1000;
  }
  &.set-minimum-width {
    min-width: 80px;
  }
  &.set-maximum-width {
    max-width: 20px;
  }
`;

export const StyledFilterGroup = styled.div`
  display: flex;
  margin-left: 50px;
  // position: relative;
`;

export const StyledFieldContainer = styled.div`
  padding: 0 1em 0 0;
  position: relative;
  margin: 0;

  &.show-vertical-connector:before,
  &.show-horizontal-connector:before,
  &.show-vertical-connector:after {
    content: '';
    position: absolute;
    background-color: #ccc;
  }

  &.show-vertical-connector:before,
  &.show-vertical-connector:after {
    width: 1px;
    left: 30px;
  }

  &.show-vertical-connector:before {
    top: -80%;
    height: calc(100% - 5px);
  }

  &.show-horizontal-connector:before {
    top: 48%;
    left: -12%;
    height: 1px;
    width: 25px;
  }

  &.show-vertical-connector:after {
    top: 100%;
    height: calc(100% - 7px);
  }

  &.action-buttons {
    display: flex;
    padding: 0;
  }
`;

export const ComponentContainer = styled.div`
  display: flex;
  padding: 0.5em 0 1em;
`;

export const StyledActionGroup = styled.div`
  padding: 2px;
  display: flex;
`;

export const StyledResetButton = styled(Button)`
  position: absolute;
  bottom: 10px;
`;
