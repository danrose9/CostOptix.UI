import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

export const PageSegment = styled(Segment)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageSection = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  align-self: center;
  &.narrow-column {
    width: 80%;
    flex-direction: column;
  }
  &.space-around {
    justify-content: space-around;
  }
`;

export const DashboardHeader = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
`;

export const SegmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SegmentName = styled.div`
  font-size: 1.5em;
`;
