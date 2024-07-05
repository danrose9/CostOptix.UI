import React, { useContext } from 'react';
import { Segment as SemanticSegment } from 'semantic-ui-react';
import styled from 'styled-components';
import { COLORS } from 'src/app/constants';
import { DocumentContext } from '../context/DocumentContext';

interface IGetStartedSegmentProps {
  heading: string;
  description: string;
  image: any;
  documentId?: string;
}

const Segment = styled(SemanticSegment)`
  display: flex;
  cursor: pointer;
  padding: 1em !important;
  &:hover {
    border: 1px solid ${COLORS.PRIMARY};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3em;
  * {
    font-family: 'Poppins', sans-serif;
  }
  h3 {
    font-size: 1.3em;
    font-weight: 500;
  }
  p {
    font-size: 1.1em;
  }
`;

const Image = styled.img`
  width: 5em;
`;

export const GetStartedSegment: React.FC<IGetStartedSegmentProps> = ({ heading, description, image, documentId }) => {
  const { setDocumentId } = useContext(DocumentContext);
  return (
    <Segment onClick={() => setDocumentId(documentId || '')} data-testid="segment">
      <Image src={image} />
      <Content>
        <h3>{heading}</h3>
        <p>{description}</p>
      </Content>
    </Segment>
  );
};
