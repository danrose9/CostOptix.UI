import React from 'react';
import { StyledPageHeader, StyledPageTitle } from './__styles__/DefaultPageStyles';

interface IPageHeader {
  title: string;
}

export const PageHeader = (props: IPageHeader) => {
  return (
    <StyledPageHeader>
      <StyledPageTitle>{props.title}</StyledPageTitle>
    </StyledPageHeader>
  );
};
