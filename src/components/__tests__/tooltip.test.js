import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StandardTooltip, TooltipDescription, ChartTooltip } from '../tooltips/index';

import renderer from 'react-test-renderer';
import { AWS96 } from '../../assets';

afterEach(() => {
  cleanup();
});

const instance = [
  { name: 'AWS', value: 456.1 },
  { name: 'Azure', value: 54.2 },
  { name: 'Microsoft', value: 353.3 },
];

describe('Tooltips', () => {
  const TestComponent = () => {
    return (
      <StandardTooltip instance={{ provider: 'Provider', accountName: 'Account Name' }}>
        <TooltipDescription instance={{ service: 'Service', resourceName: 'Resource Name' }} />
      </StandardTooltip>
    );
  };
  test('should render Standard Tooltip', () => {
    render(<TestComponent />);
  });

  test('should render Chart Tooltip', () => {
    render(<ChartTooltip instance={instance} label="label" symbol="$" />);
  });

  test('matches snapshot', () => {
    const tree = renderer.create(<TestComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
