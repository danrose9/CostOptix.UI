import styled from 'styled-components';
import { Form, Image, Grid } from 'semantic-ui-react';

export const SectionTitle = styled.p`
    font-size: 1.3rem;
`;

export const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: self-start;
`;

export const StyledFormField = styled(Form.Input)`
    font-size: 1.1rem;
    font-style: normal;
`;

export const AvatarDiv = styled(Grid.Column)`
    display: flex;
    justify-content: center;
`;

export const StyledAvatar = styled(Image)`
    font-size: 6rem;
    border: 2px solid #73AD21;
    padding: 10px;
`;
