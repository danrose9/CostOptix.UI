import React from 'react';
import { render, act } from '@testing-library/react';
import ReactGA from 'react-ga4';
import { useTrackEvent } from '../useTrackEvent';

jest.mock('react-ga4', () => ({
  event: jest.fn(),
}));

// Test component that uses the hook
const TestComponent = ({
  event,
  eventData,
  deps,
}: {
  event: string;
  eventData: Record<string, string>;
  deps: unknown[];
}) => {
  useTrackEvent(event, eventData, deps);
  return <div>Test Component</div>;
};

describe('useTrackEvent', () => {
  it('should call ReactGA.event with the correct parameters', () => {
    const event = 'testEvent';
    const eventData = { param1: 'value1', param2: 'value2' };
    const deps = ['dep1', 'dep2'];

    render(<TestComponent event={event} eventData={eventData} deps={deps} />);

    expect(ReactGA.event).toHaveBeenCalledWith(event, eventData);
  });

  it('should call ReactGA.event again if dependencies change', () => {
    const event = 'testEvent';
    const eventData = { param1: 'value1', param2: 'value2' };
    let deps = ['dep1', 'dep2'];

    const { rerender } = render(<TestComponent event={event} eventData={eventData} deps={deps} />);

    // Change dependencies
    deps = ['dep3', 'dep4'];
    rerender(<TestComponent event={event} eventData={eventData} deps={deps} />);

    // ReactGA.event should have been called twice
    expect(ReactGA.event).toHaveBeenCalledTimes(2);
  });
});
