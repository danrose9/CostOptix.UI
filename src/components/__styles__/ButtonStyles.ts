import styled from 'styled-components';
import StandardButton, { IStandardButton } from '../buttons/StandardButton';

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
