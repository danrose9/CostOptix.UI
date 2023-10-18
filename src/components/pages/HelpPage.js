import React from 'react';
import { PageContainer, PageContent } from '../__styles__/DefaultPageStyles';
import styled from 'styled-components';
import { Search, Segment, Divider, Grid, Image } from 'semantic-ui-react';

const TitleSection = styled(Segment)`
  text-align: center;
  display: table;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 3em;
  padding: 0.5em;
`;

const CategorySection = styled(Grid)`
  padding: 30px;
`;

export const HelpPage = () => {
  return (
    <PageContent>
      <PageContainer color="blue">
        <TitleSection basic>
          <Title>Hi! How can we help?</Title>
          <Search size="massive" />
        </TitleSection>
        {true ? null : <Divider horizontal>Featured Articles</Divider>}
        <Segment>
          <CategorySection columns="three">
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
          </CategorySection>
        </Segment>
      </PageContainer>
    </PageContent>
  );
};

export default HelpPage;
