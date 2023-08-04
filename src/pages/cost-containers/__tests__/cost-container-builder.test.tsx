import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CostContainerBuilder from '../builder/CostContainerBuilder';

describe('CostContainerBuilder', () => {
  let result: any;
  beforeEach(() => {
    result = render(<CostContainerBuilder />);
  });

  test('renders CostContainerBuilder component', () => {
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
    expect(screen.getByText(/Container Name/i)).toBeInTheDocument();
  });

  //   test('updates isQueryValid state when updateSetIsQueryValid is called', () => {
  //     // This is a bit tricky because you need to simulate calling the updateSetIsQueryValid function
  //     // One way to do this is to mock the QueryFilter component and make it call the function when it's rendered
  //     jest.mock('../../../components/query_filter/QueryFilter', () => {
  //       const QueryFilterMock = ({ updateSetIsQueryValid }: any) => {
  //         React.useEffect(() => {
  //           updateSetIsQueryValid(true);
  //         }, []);
  //         return <div>QueryFilter</div>;
  //       };
  //       return QueryFilterMock;
  //     });

  //     // Now when you rwender the CostContainerBuilder component, it should update the isQueryValid state
  //     result.rerender(<CostContainerBuilder />);
  //     // You need to find a way to check if the isQueryValid state has been updated
  //     // For example, you can check if the CostContainerData component renders differently when isQueryValid is true
  //     expect(screen.getByText(/CostContainerData/i)).toBeInTheDocument(); // Replace "CostContainerData" with the actual text rendered by the CostContainerData component when isQueryValid is true
  //   });
});
