import fetchInstance from './fetchInstance';
import { FEEDBACK } from './apiEndpoints';

interface ApiResponse {
  response?: Response;
  isLoading: boolean;
  error?: any;
}
interface FeedbackDataArgs {
  rating: number;
  feedbackText: string;
}

// This function is declared async and is expected to return a Promise that resolves to ApiResponse
export const submitFeedback = async (args: FeedbackDataArgs): Promise<ApiResponse> => {
  let isLoading = true;
  try {
    const response = await fetchInstance(`${FEEDBACK}`, {
      method: 'POST',
      body: JSON.stringify({
        message: `rating:${args.rating}, ${args.feedbackText}`,
      }),
    });
    isLoading = false;
    console.log(
      JSON.stringify({
        rating: args.rating,
        feedbackText: args.feedbackText,
      })
    );
    if (response.status === 204) {
      return { response, isLoading, error: undefined };
    } else {
      // Assuming non-204 status codes indicate an error condition
      const errorResponse = await response.text();
      return { response, isLoading, error: errorResponse };
    }
  } catch (error) {
    isLoading = false;
    return { isLoading, error };
  }
};
