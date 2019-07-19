import styled from 'styled-components';

export const RequestTableWrapper = styled.div`
    font-family: 'Montserrat', sans-serif;
    overflow: auto;
    width: 100%;
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        position: absolute;
        top: ${props => props.theme.appHeader.desktopHeight};
        bottom: 0;
        left: 0;
        overflow: auto;
    }
`;
