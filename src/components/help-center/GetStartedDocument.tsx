import React from 'react';
import { GetStartedSegment } from './GetStartedSegment';
import * as images from '../../assets/index';
import styled from 'styled-components';

const SegmentWrapper = styled.div`
  padding: 1em 0;
  height: 100%;
`;

const DOCUMENT = {
  SETUP: 'User-Guides-Setup',
  CONNECT_CLOUD: 'User-Guides-Add-Azure-Service-Connection',
  COST_CONTAINER: 'User-Guides-Working-With-Cost-Containers',
  ANALYZE_SPEND: 'User-Guides-cost-dashboard',
};

const GetStartedDocument = () => {
  return (
    <>
      <div>
        <h1>Get Started</h1>
        <p>
          CostOptix is a platform that gives you insight to your cloud spending and costs. With CostOptix you can create
          individual connectors to numerous cloud services to bring all of your spend data into a single window
        </p>
        <SegmentWrapper>
          <GetStartedSegment
            heading="Setup a new account"
            description="Signup and create a new CostOptix account to get started."
            image={images.CHECKLIST_ICON}
            documentId={DOCUMENT.SETUP}
          />
          <GetStartedSegment
            heading="Connect your cloud services"
            description="Connect your cloud services to CostOptix and start analyzing your spend."
            image={images.TRAFFIC_LIGHT_ICON}
            documentId={DOCUMENT.CONNECT_CLOUD}
          />
          <GetStartedSegment
            heading="Create a Cost Container"
            description="Create a cost container and analyze resource spend across different service providers."
            image={images.MONEY_BAG_ICON}
            documentId={DOCUMENT.COST_CONTAINER}
          />
          <GetStartedSegment
            heading="Start analyzing your cloud spend"
            description="Get insights into your cloud spend and start optimizing your costs."
            image={images.CHART_ICON}
            documentId={DOCUMENT.ANALYZE_SPEND}
          />
        </SegmentWrapper>
      </div>
    </>
  );
};

export default GetStartedDocument;
