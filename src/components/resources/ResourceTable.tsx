import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header, Table } from 'semantic-ui-react';
import { ProviderImage } from '../ProviderImage';
import { StyledTableRow } from '../tables/DefaultTableStyles';
import { IResource } from '../../types/resource-types';
import { AppDispatch } from '../../services/redux/store';
import { RESET_ISAVAILABLE } from '../../services/redux/reducers/resourceSlice';
import * as appRoutes from '../../app/router/appRoutes';
import { formatGrowthValue, formatCurrencyValue } from 'src/utils/valueFormatter';
import getSymbolFromCurrency from 'currency-symbol-map';

interface ISearchResults {
  map: any;
  slice: any;
}

interface IResourceTableProps {
  searchResults: ISearchResults;
}

const ResourcesTable: React.FC<IResourceTableProps> = ({ searchResults }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Table fixed striped selectable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={6}>Resource Name</Table.HeaderCell>
            <Table.HeaderCell width={6}>Service</Table.HeaderCell>
            <Table.HeaderCell width={2}>Provider</Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="right">
              Growth (30d)
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="right">
              Amount (30d)
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {searchResults?.map((resource: IResource, index: React.Key | null | undefined) => {
            const convertedCurrencySymbol = getSymbolFromCurrency(resource.currency);
            const growth30Day = formatGrowthValue(resource.growth30Day);
            const amount30Day = formatCurrencyValue(resource.amount30Day, convertedCurrencySymbol);

            return (
              <Table.Row
                as={StyledTableRow}
                key={index}
                onClick={() => {
                  dispatch<AppDispatch>(RESET_ISAVAILABLE(false));

                  navigate(appRoutes.RESOURCE_VIEW, {
                    state: { resource: resource },
                  });
                }}
              >
                <Table.Cell>{resource.resourceName}</Table.Cell>
                <Table.Cell>{resource.service}</Table.Cell>
                <Table.Cell>
                  <Header>
                    <ProviderImage provider={resource.provider} size="mini" />
                    <Header.Content>
                      <Header.Subheader>{resource.provider}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="right">{growth30Day}</Table.Cell>
                <Table.Cell textAlign="right">{amount30Day}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ResourcesTable;
