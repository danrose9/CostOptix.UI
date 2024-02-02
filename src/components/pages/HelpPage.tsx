import React from 'react';
import PageWrapper from './PageWrapper';
import styled from 'styled-components';
import { Search, Segment, Icon, Grid, Image } from 'semantic-ui-react';
import * as images from '../../assets';
import { FONT } from '../../app/constants/index';

const StyledSearchInput = styled(Search)`
  padding: 0 2em;
  &.ui.search .prompt {
    border-radius: unset !important;
  }
`;

const PageSection = styled(Segment)`
  // text-align: center;
  display: flex;
  width: 100%;
  height: auto;
  color: ${FONT.SECONDARY_COLOR} !important;
  * p {
    font-size: 1.2em;
  }
`;

const StyledImage = styled(Image)`
  width: 50em !important;
`;

const StyledIcon = styled(Icon)`
  &.icon {
    font-size: 3em;
    line-height: 1em;
    vertical-align: middle;
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  padding: 0.5em 0;
`;

export const HelpPage = () => {
  return (
    <PageWrapper>
      <PageSection>
        <div style={{ padding: '1em 3em' }}>
          <div>
            <Title>How can we help?</Title>
            <p>Want to get in touch? We'd love to hear from you. Here's is how you can reach us..</p>
          </div>
          <div style={{ padding: '2em 0', display: 'flex', alignItems: 'center' }}>
            <StyledIcon name="talk" />
            <p style={{ padding: '0 2em' }}>
              Get in contact at <a href="mailto:support@ddiware.com">support@ddiware.com</a>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledIcon name="search" />
            <StyledSearchInput size="large" placeholder="Search support articles.." fluid />
          </div>
        </div>
        <div>
          <StyledImage src={images.SUPPORT} />
        </div>
      </PageSection>
      <Segment>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </PageWrapper>
  );
};

export default HelpPage;
