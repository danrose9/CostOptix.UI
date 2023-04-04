import React, { ReactNode } from 'react';
import { Icon } from 'semantic-ui-react';

export interface IBillingAccountStatus {
  New: ReactNode;
  Pending: ReactNode;
  Connected: ReactNode;
  Disabled: ReactNode;
  Failed: ReactNode;
  Expired: ReactNode;
  Transient: ReactNode;
}

export const billingAccountStatusType = {
  New: <Icon color="olive" name="file alternate outline" size="large" />,
  Pending: <Icon color="orange" name="sync" size="large" loading />,
  Connected: <Icon color="green" name="checkmark" size="large" />,
  Disabled: <Icon color="teal" name="warning sign" size="large" />,
  Failed: <Icon color="red" name="close" size="large" />,
  Expired: <Icon color="black" name="clock outline" size="large" />,
  Transient: <Icon color="blue" name="exchange" size="large" />,
} as IBillingAccountStatus;
