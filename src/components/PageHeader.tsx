import React from 'react';
import styled from 'styled-components';

interface IPageHeader {
  title: string;
}

export const StyledPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledPageTitle = styled.div`
  font-weight: 400;
  font-size: 1.7rem;
  padding: 0.5rem 0;
`;
export const PageHeader = (props: IPageHeader) => {
  return (
    <StyledPageHeader>
      <StyledPageTitle>{props.title}</StyledPageTitle>
    </StyledPageHeader>
  );
};
