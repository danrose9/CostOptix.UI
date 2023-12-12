import React from 'react';
import { Table, Segment } from 'semantic-ui-react';
import { reduxState } from '../../../services/redux/reduxState';
import { useSelector } from 'react-redux';
import { ProviderImage } from '../../ProviderImage';
import { roundNumber } from '../../../utils/helper';
import { StyledTableRow } from '../../__styles__/DefaultTableStyles';
import DefaultTableHeader from 'src/components/tables/DefaultTableHeader';

export const CostEstimates = (props) => {
  const isLoading = useSelector((state) => state[reduxState.COST_DASHBOARD].monthToDateCost.isLoading);

  const monthlyCostEstimates = useSelector((state) => state[reduxState.COST_DASHBOARD].monthToDateCost.data);

  const Providers = ({ monthlyCostEstimates }) => {
    return (
      <>
        {monthlyCostEstimates.map((provider, index) => {
          const sanitizedCost = roundNumber(provider.cost);

          return (
            <StyledTableRow key={index}>
              <Table.Cell width={3}>
                <ProviderImage provider={provider.name} size="mini" />
              </Table.Cell>
              <Table.Cell textAlign="left">{provider.name}</Table.Cell>
              <Table.Cell textAlign="right">
                {props.currency}
                {sanitizedCost}
              </Table.Cell>
            </StyledTableRow>
          );
        })}
      </>
    );
  };

  const totalEstimate = roundNumber(monthlyCostEstimates.reduce((acc, provider) => acc + provider.cost, 0));

  return (
    <Segment color="olive" loading={isLoading}>
      <Table selectable data-testid="cost-dashboard-estimates">
        <DefaultTableHeader title="Month-to-Date Cost Estimates" colSpan={3} />
        <Table.Body>
          <Providers monthlyCostEstimates={monthlyCostEstimates} />
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell textAlign="right">
              {props.currency}
              {totalEstimate}
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Segment>
  );
};

export default CostEstimates;
