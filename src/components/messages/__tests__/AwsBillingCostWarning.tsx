import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AwsBillingCostWarning } from '../index';

describe('AwsBillingCostWarning', () => {
  it('renders correctly', () => {
    const { getByText } = render(<AwsBillingCostWarning onCheckboxChange={() => {}} />);
    expect(getByText('AWS Cost Information')).toBeInTheDocument();
    expect(getByText('I understand that CostOptix is not responsible for AWS costs')).toBeInTheDocument();
  });
});
