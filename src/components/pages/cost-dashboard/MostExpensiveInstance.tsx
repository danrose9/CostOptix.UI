import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reduxState } from '../../../services/redux/reduxState';
import { Table, Segment, Popup, Card } from 'semantic-ui-react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';
import { RESET_ISAVAILABLE } from '../../../services/redux/reducers/resourceSlice';
import { StyledHeaderCell, StyledTableRow } from '../../tables/DefaultTableStyles';
import { StandardTooltip, TooltipDescription } from '../../tooltips';
import { IRootState } from 'src/services/redux/rootReducer';
import { IBillingAccountMostExpensive } from '../../../types/billing-account-types';
import { getEmbeddedResourceName } from 'src/utils/stringFormatter';

interface IToolTipData {
  instance: {
    currency: string;
    amount30Day: number;
    convertedCurrency: string;
    amount30DayConverted: number;
    isCurrencyConflict: boolean;
  };
}

const ToolTipData: React.FC<IToolTipData> = (instance) => {
  const { currency, amount30Day, convertedCurrency, amount30DayConverted, isCurrencyConflict } = instance.instance;
  return (
    <>
      <Card.Content textAlign="right">
        Cost :{' '}
        <strong>
          {getSymbolFromCurrency(currency)}
          {amount30Day}({currency})
        </strong>
        {isCurrencyConflict ? (
          <Card.Content textAlign="right">
            Converted :{' '}
            <strong>
              {getSymbolFromCurrency(convertedCurrency)}
              {amount30DayConverted}({convertedCurrency})
            </strong>
          </Card.Content>
        ) : null}
      </Card.Content>
    </>
  );
};

interface IMostExpensiveInstance {
  isCurrencyConflict: boolean;
}

export const MostExpensiveInstance: React.FC<IMostExpensiveInstance> = (props) => {
  const { isCurrencyConflict } = props;

  const mostExpensiveService = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD].mostExpensive.data);

  const isLoading = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD].mostExpensive.isLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    navigate(appRoutes.RESOURCE_SEARCH);
  };

  return (
    <Segment color="orange" loading={isLoading}>
      <Table fixed selectable>
        <Table.Header onClick={handleOnClick}></Table.Header>
        <Table.Header>
          <Table.Row>
            <StyledHeaderCell data-testid="most-expensive-resources" colSpan={isCurrencyConflict ? 3 : 2}>
              Most Expensive Resources Last 30 days
            </StyledHeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width={8}>Resource</Table.HeaderCell>
            <Table.HeaderCell textAlign="right" width={4}>
              Cost
            </Table.HeaderCell>
            {props.isCurrencyConflict ? (
              <Table.HeaderCell textAlign="right" width={4}>
                Converted
              </Table.HeaderCell>
            ) : null}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {mostExpensiveService
            .filter((instance: IBillingAccountMostExpensive) => instance.amount30Day > 0)
            .map((instance: IBillingAccountMostExpensive, index: any) => {
              const currencySymbol = getSymbolFromCurrency(instance.currency);
              const convertedCurrencySymbol = getSymbolFromCurrency(instance.convertedCurrency);

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
                      <Table.Cell textAlign="right">
                        {currencySymbol}
                        {instance.amount30Day}
                      </Table.Cell>
                      {props.isCurrencyConflict ? (
                        <Table.Cell textAlign="right">
                          {convertedCurrencySymbol}
                          {instance.amount30DayConverted}
                        </Table.Cell>
                      ) : null}
                    </Table.Row>
                  }
                  content={
                    <StandardTooltip instance={instance}>
                      <TooltipDescription instance={instance} />
                      <ToolTipData
                        instance={{
                          ...instance,
                          isCurrencyConflict: props.isCurrencyConflict,
                        }}
                      />
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

export default MostExpensiveInstance;
