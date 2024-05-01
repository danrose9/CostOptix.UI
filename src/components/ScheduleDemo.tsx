import React from 'react';
import PageWrapper from './pages/PageWrapper';
import { PageSection } from './pages/DefaultPageStyles';
import { Button, Form } from 'semantic-ui-react';

import {
  DescriptionContainer,
  Segment,
  Card,
  FormContainer,
  CardHeader,
} from '../components/__styles__/ExternalPageStyles';

export const ScheduleDemo = () => {
  return (
    <PageWrapper>
      <PageSection>
        <Segment>
          <DescriptionContainer>
            <p>Discover the power of cost visualization across each of your cloud providers with CostOptix. </p>
            <p>
              Our platform seamlessly integrates with Azure and Amazon Web Services to bring you hugh cost saving
              benifits and impressive insights into your cloud spend.
            </p>
            <p>Why take a Demo?</p>
            <p>
              <ul>
                <li>
                  Single pane of glass: CostOptix provides a unified view of your cloud spend across multiple providers.
                </li>
                <li>
                  Track your spend: Real-time cost tracking and forecasting help you stay on top of your cloud spend.
                </li>
                <li>
                  Gain insights: CostOptix provides detailed insights into your spend across tagged resources, helping
                  you make informed decisions.
                </li>
              </ul>
            </p>
            <p>Ready to transform your cloud spending?</p>
          </DescriptionContainer>
        </Segment>
        <Segment>
          <Card>
            <CardHeader>
              <p>Schedule a demo today and see CostOptix in action!</p>
            </CardHeader>
            <FormContainer>
              <Form unstackable>
                <Form.Group widths={2}>
                  <Form.Input label="First name*" placeholder="First name" />
                  <Form.Field>
                    <label>Last Name*</label>
                    <input placeholder="Last name" />
                  </Form.Field>
                </Form.Group>
                <Form.Input label="Email address*" placeholder="Email address" />
                <Form.Input label="Company" placeholder="Company" />
                <Form.Input label="Phone number" placeholder="Phone number" />
                <Button type="submit">Submit</Button>
              </Form>
            </FormContainer>
          </Card>
        </Segment>
      </PageSection>
    </PageWrapper>
  );
};

export default ScheduleDemo;
