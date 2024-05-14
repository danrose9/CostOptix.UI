import { BASE, FEEDBACK, DEMO_REQUEST, GENERAL_ENQUIRY, PRICE_REQUEST } from './apiEndpoints';

interface ApiResponse {
  response?: Response;
  isLoading: boolean;
  error?: any;
}

export interface ContactInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
}

interface SubmitDemoRequestArgs {
  contact: ContactInfo;
}

interface SubmitFeedbackArgs {
  contact?: ContactInfo;
  message?: string;
  rating?: number;
  isCallbackRequested?: boolean;
}

export const submitDemoRequest = async (args: SubmitDemoRequestArgs): Promise<ApiResponse> => {
  let isLoading = true;
  try {
    const response = await fetch(`${BASE}${DEMO_REQUEST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          firstName: args.contact.firstName,
          lastName: args.contact.lastName,
          email: args.contact.email,
          phone: args.contact.phone,
          company: args.contact.company,
        },
      }),
    });
    isLoading = false;

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

export const submitPricingRequest = async (args: SubmitDemoRequestArgs): Promise<ApiResponse> => {
  let isLoading = true;
  try {
    const response = await fetch(`${BASE}${PRICE_REQUEST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          firstName: args.contact.firstName,
          lastName: args.contact.lastName,
          email: args.contact.email,
          phone: args.contact.phone,
          company: args.contact.company,
        },
      }),
    });
    isLoading = false;

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

export const submitFeedback = async (args: SubmitFeedbackArgs): Promise<ApiResponse> => {
  let isLoading = true;
  try {
    const response = await fetch(`${BASE}${FEEDBACK}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          firstName: args.contact?.firstName,
          lastName: args.contact?.lastName,
          email: args.contact?.email,
          phone: args.contact?.phone,
          company: args.contact?.company,
        },
        message: args.message,
        rating: args.rating,
      }),
    });
    isLoading = false;

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

export const submitEnquiry = async (args: SubmitFeedbackArgs): Promise<ApiResponse> => {
  let isLoading = true;
  try {
    const response = await fetch(`${BASE}${GENERAL_ENQUIRY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          firstName: args.contact?.firstName,
          lastName: args.contact?.lastName,
          email: args.contact?.email,
          phone: args.contact?.phone,
          company: args.contact?.company,
        },
        message: args.message,
        isCallbackRequested: args.isCallbackRequested,
      }),
    });
    isLoading = false;

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
