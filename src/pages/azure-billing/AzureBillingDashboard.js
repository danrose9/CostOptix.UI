import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import {
  fetchAgreementType,
  fetchSubscriptions,
  fetchInvoices,
} from '../../services/redux/thunks/azureManagementThunk';
import { reduxState } from '../../services/redux/reduxState';
import {
  DashboardHeader,
  DashboardTitle,
} from '../__styles__/DefaultPageStyles';

const AzureBillingDashboard = () => {
  const [isLoading] = useState(true);
  const dispatch = useDispatch();
  const content = useSelector((state) => state[reduxState.AZURE_MANAGEMENT]);

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchAgreementType());
    }
  }, [dispatch, isLoading]);

  const BillingType = useCallback(() => {
    const childToParent = async (azureSubscription) => {
      dispatch(fetchInvoices(azureSubscription));
    };

    switch (content.agreementType) {
      case 'MicrosoftCustomerAgreement':
        return <h4>MicrosoftCustomerAgreement</h4>;
      case 'MicrosoftPartnerAgreement':
        return <h4>MicrosoftCustomerAgreement</h4>;
      case 'EnterpriseAgreement':
        return <h4>MicrosoftCustomerAgreement</h4>;
      case 'MicrosoftOnlineServicesProgram':
        return <AzureSubscriptionDropdown childToParent={childToParent} />;
      default:
        return <h4>Nothing to display</h4>;
    }
  }, [content.agreementType, dispatch]);

  return (
    <>
      <DashboardHeader>
        <DashboardTitle>Azure Billing Dashboard</DashboardTitle>
        <BillingType />
      </DashboardHeader>

      {content.invoices.length === 0 ? (
        <h4>No Invoices</h4>
      ) : (
        <h4>Some Invoices</h4>
        // <>
        //   <AzureBillingCards
        //     content={content.billingInvoice.summary}
        //     currencySymbol={currencySymbol}
        //   />
        //   <Grid columns={2}>
        //     <Grid.Column floated="left" width={7}>
        //       <AzureBillingInformation
        //         content={content}
        //         currencySymbol={currencySymbol}
        //       />
        //     </Grid.Column>
        //     <Grid.Column floated="right" width={9}>
        //       <AzureBillingChart content={content} />
        //     </Grid.Column>
        //   </Grid>
        //   <AzureBillingInvoices
        //     content={content}
        //     currencySymbol={currencySymbol}
        //   />
        // </>
      )}
    </>
  );
};

export const AzureSubscriptionDropdown = (props) => {
  const dispatch = useDispatch();
  const [isLoading] = useState(true);
  const azureSubscriptions = useSelector(
    (state) => state[reduxState.AZURE_MANAGEMENT].subscriptions
  );

  const optionCount = azureSubscriptions.length;

  const options = () => {
    if (optionCount === 0) {
      return null;
    } else {
      const dropdownmapper = azureSubscriptions.map((subscription) => {
        return {
          key: subscription.id,
          value: subscription.id,
          text: subscription.displayName + ' (' + subscription.id + ')',
        };
      });

      return dropdownmapper;
    }
  };

  // Fetch Billing Invoices
  const passValueToParent = (event, data) => {
    props.childToParent(data.value);
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchSubscriptions());
    }
  }, [dispatch, isLoading]);

  return (
    <>
      {optionCount === 0 ? (
        <>true</>
      ) : (
        <Dropdown
          floating
          labeled
          options={options()}
          onChange={passValueToParent}
          selection
          placeholder="Select Azure Subscription"
        />
      )}
    </>
  );
};

export default AzureBillingDashboard;
