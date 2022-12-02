import React from 'react';
import {
  DashboardHeader,
  DashboardTitle,
} from '../pages/__styles__/DefaultPageStyles';

export const PageTitle = (props) => {
  return (
    <DashboardHeader>
      <DashboardTitle>{props.title}</DashboardTitle>
    </DashboardHeader>
  );
};
