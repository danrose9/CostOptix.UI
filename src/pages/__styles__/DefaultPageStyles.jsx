import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

export const PageContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PageContainer = styled(Segment)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StyledPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
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

export const StyledPageTitle = styled.div`
  font-weight: 400;
  font-size: 1.7rem;
  padding: 0.5rem 0;
`;

///
/// Table Styles
///

export const TableContainer = styled.div`
  padding: 0.5em;
`;

export const TableHeader = styled.div`
  display: flex;
`;

export const TableFooter = styled.div`
 
`;

export const SegmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SegmentName = styled.div`
  font-size: 1.5em;
`;