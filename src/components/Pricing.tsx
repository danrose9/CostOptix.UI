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
          subscriptionType="Try It"
          strapline="Get a complete initial overview of your cost model for Azure and AWS cloud spend in as little as 10 minutes"
          features={[
            'Free no obligation 30 day trial',
            'Quick, easy, initial setup',
            'Cost overview dashboard',
            'In depth resource cost breakdown',
            'Cost drill-downs',
            'Multi-service combined spend review',
            'Free support',
          ]}
          children={
            <Button positive onClick={() => navigate(appRoutes.SIGNUP)}>
              Get Started Free
            </Button>
          }
        />
        <PricingCard
          image={images.CERTIFICATE}
          subscriptionType="Buy It"
          strapline="Start with a yearly subscription to CostOptix for as low as $999."
          secondaryStrapline="Get full access to all features including an assigned Customer Success Manager."
          children={
            <>
              <p>Please complete the form below</p>
              <FormContainer className="full-width reduce-padding">
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
