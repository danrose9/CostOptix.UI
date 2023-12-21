import styled from 'styled-components';
import { Card, Modal } from 'semantic-ui-react';

export { StyledDropDown } from '../../tables/DefaultTableStyles';

export const StyledContent = styled.p`
    font-size: 1em;
`;

export const ServiceConnectionPage = styled.div`
    padding: 1rem;
`;

export const ServiceConnectionCard = styled(Card)`
    height: 100%;
`;

export const StyledTable = styled.div`
    max-height: 230px;
    overflow-x: auto;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ServiceConnectionHeader = styled.p`
    font-size: 1.2em;
    padding-left: 1.5em;
`;

export const ServiceConnectionModalWrapper = styled.div`
    display: inline-flex;
`;

export const ServiceConnectionModalActions = styled(Modal.Actions)`
    display: flex;
    flex-direction: row-reverse;
`;

