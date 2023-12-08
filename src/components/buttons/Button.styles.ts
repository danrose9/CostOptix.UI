import styled from 'styled-components';
import StandardButton, { IStandardButton } from './StandardButton';
import { Icon, Button } from 'semantic-ui-react';

export const SpaceBetweenButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonGroup = styled.div`
  &.absolute-position {
    position: absolute;
    bottom: 1em;
  }
`;

export const StyledStandardButton = styled(StandardButton)<IStandardButton>`
  &&& {
    margin-left: 1em;
  }
`;

export const StyledIcon = styled(Icon)`
  padding: 0 1rem;
  cursor: pointer;
  &.absolute-position {
    position: absolute;
    top: 1em;
    right: 1em;
    color: #01b5ad;
  }
  &.information-icon {
    color: #3f6fbe;
  }
`;

export const IdpButton = styled(Button)`
  width: 100%;
  height: 3em;
  font-size: 16px !important;
  border: 1px solid #636d77 !important;
  display: flex !important;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px !important;
  background: none !important;
  font-family: 'system-ui', sans-serif !important;
  &:hover {
    background-color: #dedede;
  }
`;

export const IdpButtonText = styled.div`
  font-weight: 600;
  font-size: 1em;
  color: #636d77;
  padding-left: 1em;
`;

export const IdpButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;
