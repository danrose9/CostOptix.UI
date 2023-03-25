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
  New: <Icon color="green" name="add" size="large" />,
  Pending: <Icon color="grey" name="wait" size="large" />,
  Connected: <Icon color="green" name="checkmark" size="large" />,
  Disabled: <Icon color="orange" name="pause circle outline" size="large" />,
  Failed: <Icon color="red" name="close" size="large" />,
  Expired: <Icon color="orange" name="clock outline" size="large" />,
  Transient: <Icon color="blue" name="exchange" size="large" />,
} as IBillingAccountStatus;
