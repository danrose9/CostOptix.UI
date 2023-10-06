import styled from 'styled-components';
import StandardButton, { IStandardButton } from '../buttons/StandardButton';

export const StyledStandardButton = styled(StandardButton)<IStandardButton>`
  &&& {
    margin-left: 1em;
  }
`;
