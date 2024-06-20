import React from 'react';
import { Label, SemanticCOLORS } from 'semantic-ui-react';
import styled from 'styled-components';

const tagColors: { [key: string]: SemanticCOLORS } = {
  Azure: 'blue',
  AWS: 'yellow',
  default: 'green',
};
const BlogTagsSection = styled.div`
  display: flex;
  align-items: center;
  & p {
    padding: 0 2em;
  }
`;

interface IBlogTagsProps {
  tags: string[] | null;
}

const BlogTags: React.FunctionComponent<IBlogTagsProps> = ({ tags }) => {
  return (
    <BlogTagsSection>
      {tags
        ? tags.map((tag, index) => (
            <Label color={tagColors[tag] || tagColors.default} key={index}>
              {tag}
            </Label>
          ))
        : null}
    </BlogTagsSection>
  );
};

export default BlogTags;
