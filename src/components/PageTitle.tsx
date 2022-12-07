import React from 'react';
import {
  DashboardHeader,
  DashboardTitle,
} from '../pages/__styles__/DefaultPageStyles';

import { IPageTitle } from '../types';

export const PageTitle = (props: IPageTitle) => {
  return (
    <DashboardHeader>
      <DashboardTitle>{props.title}</DashboardTitle>
    </DashboardHeader>
  );
};
