import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddServiceAWS from '../providers/AddServiceAWS'; // update the path

describe('AddServiceAWS', () => {
  it('renders correctly', () => {
    const { getByText } = render(<AddServiceAWS DisableButtonOnInvalidForm={jest.fn()} updateFormData={jest.fn()} />);
    expect(getByText('AWS Cost Information')).toBeInTheDocument();
  });

  // You can continue adding more tests similar to the above for other functionalities or cases.
});
