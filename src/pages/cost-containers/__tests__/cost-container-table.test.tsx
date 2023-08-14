import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CostContainerTable, { ContainersType } from '../CostContainerTable';
import { containers } from '../containerMockData';
import { ApplicationWrapper } from '../../../tests/helpers';

describe('CostContainerTable', () => {
  beforeEach(() => {
    render(<CostContainerTable containers={containers} />, { wrapper: ApplicationWrapper });
  });

  test('The table renders with mock data', () => {
    expect(screen.getByText('Software Project 1')).toBeInTheDocument();
  });

  // test('checks "Show Query" and "Hide Query" are triggered correctly and show at the right time', () => {
  //   // Click the "Add" option to show the add container
  //   const addOption = screen.getByText('Add');
  //   fireEvent.click(addOption);
  //   // Check that the "Show Query" option is now visible
  //   const showQueryOption = screen.getByText('Show Query');
  //   expect(showQueryOption).toBeInTheDocument();
  //   // Click the "Show Query" option to show the query
  //   fireEvent.click(showQueryOption);
  //   // Check that the "Hide Query" option is now visible
  //   const hideQueryOption = screen.getByText('Hide Query');
  //   expect(hideQueryOption).toBeInTheDocument();
  //   // Click the "Hide Query" option to hide the query
  //   fireEvent.click(hideQueryOption);
  //   // Check that the "Show Query" option is now visible again
  //   expect(screen.getByText('Show Query')).toBeInTheDocument();
  // });

  // test('Check the "Add" option and "Add Container" row are shown by default', () => {
  //   expect(screen.getByText('Add')).toBeInTheDocument();
  //   expect(screen.getByText('Add Container')).toBeInTheDocument();
  // });
  // test('Clicking "Add Container" row renders CostContainerBuilder', async () => {
  //   const addContainer = screen.getByTestId('add-new-container-row');
  //   fireEvent.click(addContainer);
  //   // Assuming CostContainerBuilder renders a specific text or element
  //   await waitFor(
  //     () => {
  //       expect(screen.getByTestId('cost-container-reset-button')).toBeInTheDocument();
  //     },
  //     { timeout: 2000 }
  //   );
  //   // console.log(prettyDOM(document.body));
  // });
  // test('Test 2: Clicking "Add" option or "Add Container" row renders CostContainerBuilder', () => {
  //   fireEvent.click(screen.getByText('Add Container'));
  //   // Assuming CostContainerBuilder renders a specific text or element
  //   expect(screen.getByTestId('cost-container-reset-button')).toBeInTheDocument();
  //   fireEvent.click(screen.getByText('Add Container'));
  //   expect(screen.getByTestId('cost-container-reset-button')).toBeInTheDocument();
  // });
  // test('Test 3: When CostContainerBuilder is in focus, dropdown shows "Close" & "Show Query"', () => {
  //   fireEvent.click(screen.getByText('Add'));
  //   expect(screen.getByText('Close')).toBeInTheDocument();
  //   expect(screen.getByText('Show Query')).toBeInTheDocument();
  // });
  // test('Test 4: When "Show Query" is selected, dropdown shows "Hide Query"', () => {
  //   fireEvent.click(screen.getByText('Add'));
  //   fireEvent.click(screen.getByText('Show Query'));
  //   expect(screen.getByText('Hide Query')).toBeInTheDocument();
  // });
  // test('Test 5: When "Close" is selected, page renders TableContents and "Add Container" is back', () => {
  //   fireEvent.click(screen.getByText('Add'));
  //   fireEvent.click(screen.getByText('Close'));
  //   expect(screen.getByText('Add Container')).toBeInTheDocument();
  // });
});

// describe('CostContainerTable', () => {
//   test('1. The table renders with mock data', () => {
//     render(<CostContainerTable containers={mockContainers} />);
//     expect(screen.getByText('Container 1')).toBeInTheDocument();
//   });

//   test('2. Clicking AddNewContainer renders the CostContainerBuilder', () => {
//     render(<CostContainerTable containers={mockContainers} />);
//     fireEvent.click(screen.getByTestId('add-new-container-row'));
//     // Assuming CostContainerBuilder has a specific text or element to identify
//     expect(screen.getByText('Specific text or element from CostContainerBuilder')).toBeInTheDocument();
//   });

//   test("3. Clicking 'Add' in handleDropdownChange also renders the CostContainerBuilder", () => {
//     render(<CostContainerTable containers={mockContainers} />);
//     fireEvent.click(screen.getByText('Add'));
//     // Assuming CostContainerBuilder has a specific text or element to identify
//     expect(screen.getByText('Specific text or element from CostContainerBuilder')).toBeInTheDocument();
//   });

//   test("4. Clicking 'Close' in handleDropdownChange returns to the CostContainerTable", () => {
//     render(<CostContainerTable containers={mockContainers} />);
//     fireEvent.click(screen.getByText('Close'));
//     expect(screen.getByText('Container 1')).toBeInTheDocument();
//   });

//   test('5. Clicking Show/Hide Query renders the query output in CostContainerBuilder', () => {
//     render(<CostContainerTable containers={mockContainers} />);
//     fireEvent.click(screen.getByText('Show Query'));
//     // Assuming the query output is rendered with specific text or element
//     expect(screen.getByText('Query output text or element')).toBeInTheDocument();
//   });
// });
