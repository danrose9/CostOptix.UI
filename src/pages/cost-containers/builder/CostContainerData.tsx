import * as React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { SectionTitle, StyledFormField } from '../../__styles__/settings.styles';
import { Button } from 'semantic-ui-react';

interface ICostContainerResourceData {}

export interface ICostContainerDataProps {}

export function CostContainerData(props: ICostContainerDataProps) {
  return (
    <div>
      <p>
        Cost Containers are a virtual grouping of cloud resources designed to facilitate efficient cost management and
        analysis within a cloud environment they provide a convenient way to track and monitor costs, trends, and other
        cost-related information.
      </p>

      <br />
      <p>
        They allow you to gain insights into your cloud spending patterns, identify cost-saving opportunities, and
        allocate expenses accurately across different teams or projects. The granular visibility into costs helps
        optimize resource allocation, control budget, and make informed decisions to maximize the value of cloud
        investments.
      </p>
      <br />
      <p>
        Use the query builder to create containers based on providers, organizations and other fields. Cost Containers .
      </p>

      <SectionTitle>Container Information</SectionTitle>
      <Form size="small">
        <StyledFormField label="Container Name" placeholder="Container Name" icon="users" value="" />
        <StyledFormField label="Organization Id" readOnly placeholder="Organization Id" icon="address card outline" />

        <Button color="teal" disabled={false}>
          Update
        </Button>
      </Form>
    </div>
  );
}
