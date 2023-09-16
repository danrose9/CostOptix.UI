import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  padding: 0.5em 0 1em;
`;

export const FullWidthContainer = styled.div`
  width: 100%;
`;

export const ComponentContainer = styled.div`
  display: flex;
  margin-top: 1em;
`;

export const StyledSegment = styled(Segment)`
  margin: 0 !important;
  padding: 1em;

  &.fill-available {
    width: -webkit-fill-available;
  }
`;