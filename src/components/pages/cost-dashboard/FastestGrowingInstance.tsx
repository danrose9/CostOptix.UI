import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reduxState } from '../../../services/redux/reduxState';
import { Table, Segment, Popup, Card } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';
import { RESET_ISAVAILABLE } from '../../../services/redux/reducers/resourceSlice';
import { StyledHeaderCell } from '../../tables/DefaultTableStyles';
import { StandardTooltip, TooltipDescription } from '../../tooltips';
import { StyledTableRow } from '../../tables/DefaultTableStyles';
import { IBillingAccountFastestGrowing } from '../../../types/billing-account-types';
import { getEmbeddedResourceName } from 'src/utils/stringFormatter';
import { IRootState } from 'src/services/redux/rootReducer';

interface IToolTipData {
  instance: {
    growth30Day: number;
  };
}

const ToolTipData: React.FC<IToolTipData> = (instance) => {
  const { growth30Day } = instance.instance;
  return (
    <Card.Content textAlign="right">
      30 day growth : <strong>{growth30Day}%</strong>
    </Card.Content>
  );
};

export const FastestGrowingInstance = () => {
  const fastestGrowingInstance = useSelector(
    (state: IRootState) => state[reduxState.COST_DASHBOARD].fastestGrowing.data
  );

  const isLoading = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD].fastestGrowing.isLoading);

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
            <StyledHeaderCell colSpan="2" data-testid="fastest-growing-resources">
              Top 5 Fastest Growing Resources
            </StyledHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Resource</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">30d growth</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {fastestGrowingInstance
            .filter((instance: IBillingAccountFastestGrowing) => instance.growth30Day)
            .map((instance: IBillingAccountFastestGrowing, index: any) => {
              return (
                <Popup
                  key={index}
                  trigger={
                    <Table.Row
                      as={StyledTableRow}
                      onClick={() => {
                        dispatch(RESET_ISAVAILABLE(false));
                        navigate(appRoutes.RESOURCE_VIEW, {
                          state: { resource: instance },
                        });
                      }}
                    >
                      <Table.Cell singleLine>{getEmbeddedResourceName(instance.resourceName)}</Table.Cell>
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
