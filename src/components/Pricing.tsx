import React, { useState } from 'react';
import PageWrapper from './pages/PageWrapper';
import { PageSection } from './pages/DefaultPageStyles';
import { Button, Form, Message } from 'semantic-ui-react';
import { PricingCard } from './cards/PricingCard';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from 'src/app/router/appRoutes';
import { FormContainer } from './__styles__/ExternalPageStyles';
import * as images from '../assets/index';
import { validateEmail } from 'src/utils/formValidation';
import { submitPricingRequest, ContactInfo } from 'src/services/api/apiFeedback';

export const Pricing = () => {
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validateForm = validateEmail(emailAddress) && firstName.length > 0;

  const updateFields = (e: any) => {
    if (e.target.id === 'email') {
      setEmailAddress(e.target.value);
    }
    if (e.target.id === 'firstName') {
      setFirstName(e.target.value);
    }
    if (e.target.id === 'lastName') {
      setLastName(e.target.value);
    }
    if (e.target.id === 'company') {
      setCompany(e.target.value);
    }
    setIsFormValid(!!validateForm);
  };

  const clearFields = () => {
    setEmailAddress('');
    setFirstName('');
    setLastName('');
    setCompany('');
    setShowValidationMessage(false);
  };

  const ValidationMessage = () => {
    return (
      <Message color="yellow">
        <Message.Content>Please enter a valid name and email address</Message.Content>
      </Message>
    );
  };

  const SuccessMessage = () => (
    <Message color="green">
      <Message.Content>
        Thank you for your interest, one of our sales representatives will be in touch shortly
      </Message.Content>
    </Message>
  );

  const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isFormValid) {
      const contactInfo: ContactInfo = { firstName, lastName, email: emailAddress, company };
      await submitPricingRequest({ contact: contactInfo });
      clearFields();
      setShowSuccessMessage(true);
    } else {
      setShowValidationMessage(true);
    }
  };

  return (
    <PageWrapper>
      <PageSection className="space-around">
        <PricingCard
          image={images.TARGET}
          subscriptionType="Free"
          subscriptionStrapline="Completely free with no obligation. Signup and get a 1 month free trial."
          features={[
            'Full access to all features',
            'Unlimited service connections',
            'Free customer support',
            'Zero obligation',
          ]}
          children={
            <Button positive onClick={() => navigate(appRoutes.SIGNUP)}>
              Get Started Free
            </Button>
          }
        />
        <PricingCard
          image={images.CERTIFICATE}
          subscriptionType="Flexible"
          subscriptionStrapline="Let us help you create a flexible plan suitable for your business. "
          children={
            <>
              <p>Please complete the form below</p>
              <FormContainer className="full-width">
                <Form>
                  <Form.Group widths={2}>
                    <Form.Input placeholder="First name*" id="firstName" onChange={updateFields} value={firstName} />
                    <Form.Input placeholder="Last name*" id="lastName" onChange={updateFields} value={lastName} />
                  </Form.Group>
                  <Form.Input placeholder="Email address*" id="email" onChange={updateFields} value={emailAddress} />
                  <Form.Input placeholder="Company" id="company" onChange={updateFields} value={company} />
                </Form>
                {showValidationMessage ? <ValidationMessage /> : null}
                {showSuccessMessage ? <SuccessMessage /> : null}
                <Button primary onClick={handleOnSubmit}>
                  Request Pricing
                </Button>
              </FormContainer>
            </>
          }
        />
      </PageSection>
    </PageWrapper>
  );
};

export default Pricing;
