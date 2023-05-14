import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { Table, Segment, Popup, Card } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/appRoutes';
import { RESET_ISAVAILABLE } from '../../services/redux/reducers/resourceSlice';
import { StyledHeaderCell } from '../../components/tables/DefaultTableStyles';
import { StandardTooltip, TooltipDescription } from '../../components/tooltips';

const ToolTipData = (instance) => {
  const { growth30Day } = instance.instance;
  return (
    <Card.Content textAlign="right">
      30 day growth : <strong>{growth30Day}%</strong>
    </Card.Content>
  );
};

export const FastestGrowingInstance = () => {
  const fastestGrowingInstance = useSelector((state) => state[reduxState.COST_DASHBOARD].fastestGrowing.data);

  const isLoading = useSelector((state) => state[reduxState.COST_DASHBOARD].fastestGrowing.isLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    navigate(appRoutes.RESOURCE_SEARCH);
  };

  return (
    <Segment color="purple" loading={isLoading}>
      <Table fixed selectable>
        <Table.Header onClick={handleOnClick} data-testid="table-header-1">
          <Table.Row>
            <StyledHeaderCell colSpan="3">Fastest Growing Resources</StyledHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Resource</Table.HeaderCell>
            <Table.HeaderCell>Service</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">30d growth</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {fastestGrowingInstance
            .filter((instance) => instance.growth30Day)
            .map((instance, index) => {
              return (
                <Popup
                  key={index}
                  trigger={
                    <Table.Row
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        dispatch(RESET_ISAVAILABLE(false));
                        navigate(appRoutes.RESOURCE_VIEW, {
                          state: { resource: instance },
                        });
                      }}
                    >
                      <Table.Cell singleLine>{instance.resourceName}</Table.Cell>
                      <Table.Cell singleLine>{instance.service}</Table.Cell>
                      <Table.Cell textAlign="right" singleLine>
                        {instance.growth30Day}%
                      </Table.Cell>
                    </Table.Row>
                  }
                  content={
                    <StandardTooltip instance={instance}>
                      <TooltipDescription instance={instance} />
                      <ToolTipData instance={instance} />
                    </StandardTooltip>
                  }
                ></Popup>
              );
            })}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default FastestGrowingInstance;
