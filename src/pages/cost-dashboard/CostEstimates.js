import React from 'react';
import { Table, Segment } from 'semantic-ui-react';
import { reduxState } from '../../services/redux/reduxState';
import { useSelector } from 'react-redux';
import { ProviderImage } from '../../components/ProviderImage';
import { roundNumber } from '../../utils/helper';
import { StyledTableRow } from '../../components/tables/DefaultTableStyles';

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
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3">Month-to-Date Cost Estimates</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
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
