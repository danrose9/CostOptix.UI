import React from 'react';
import { render } from '@testing-library/react';
import ReactGA from 'react-ga4';
import { useTrackPageView } from '../useTrackPageView';

jest.mock('react-ga4', () => ({
  send: jest.fn(),
}));

// Test component that uses the hook
const TestComponent = ({ pageName, deps }: { pageName: string; deps: unknown[] }) => {
  useTrackPageView(pageName, deps);
  return <div>Test Component</div>;
};

describe('useTrackPageView', () => {
  it('should call ReactGA.send with the correct parameters', () => {
    const pageName = 'testPage';
    const deps = ['dep1', 'dep2'];

    render(<TestComponent pageName={pageName} deps={deps} />);

    expect(ReactGA.send).toHaveBeenCalledWith({
      hitType: 'pageview',
      page: pageName,
      title: pageName,
    });
  });

  it('should call ReactGA.send again if dependencies change', () => {
    const pageName = 'testPage';
    let deps = ['dep1', 'dep2'];

    const { rerender } = render(<TestComponent pageName={pageName} deps={deps} />);

    // Change dependencies
    deps = ['dep3', 'dep4'];
    rerender(<TestComponent pageName={pageName} deps={deps} />);

    // ReactGA.send should have been called twice
    expect(ReactGA.send).toHaveBeenCalledTimes(2);
  });
});
