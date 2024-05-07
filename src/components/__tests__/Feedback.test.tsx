import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Feedback, FEEDBACK_PLACEHOLDER, FEEDBACK_LABEL } from '../Feedback';
import * as api from 'src/services/api/apiFeedback';

const RATING_SELECTOR = 'rating-selector';

// Mock the submitFeedback API call
jest.mock('src/services/api/apiFeedback', () => ({
  submitFeedback: jest.fn(),
}));

describe('Feedback Component', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (api.submitFeedback as jest.Mock).mockClear();
  });

  test('initial render and open feedback form', () => {
    const { getByText, queryByText } = render(<Feedback />);
    expect(queryByText('Submit')).not.toBeInTheDocument();

    fireEvent.click(getByText(FEEDBACK_LABEL));
    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('submitting feedback', async () => {
    const { getByText, getByPlaceholderText, getByTestId, queryByText } = render(<Feedback />);

    fireEvent.click(getByText(FEEDBACK_LABEL));

    const ratingSelector = getByTestId(RATING_SELECTOR);
    const fifthStar = ratingSelector.querySelector('i[aria-posinset="5"]');
    if (fifthStar) {
      fireEvent.click(fifthStar);
    }

    // Simulate user input
    fireEvent.change(getByPlaceholderText(FEEDBACK_PLACEHOLDER), {
      target: { value: 'Great experience!' },
    });
    fireEvent.click(getByText('Submit'));

    // Mock successful feedback submission
    (api.submitFeedback as jest.Mock).mockResolvedValue({ success: true });

    expect(api.submitFeedback).toHaveBeenCalledWith({
      rating: 5,
      contact: { email: 'demo@demo.com' },
      message: 'Great experience!',
    });

    expect(api.submitFeedback).toHaveBeenCalledTimes(1);
  });
});
