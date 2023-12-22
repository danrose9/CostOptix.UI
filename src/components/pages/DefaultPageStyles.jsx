import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

export const PageContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageSegment = styled(Segment)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
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