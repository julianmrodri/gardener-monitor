import styled from 'styled-components';

export const RequestTableCell = styled.td`
    box-sizing: border-box;
    text-align: center;
    padding: ${props => props.theme.appHeader.padding};
    width: 100vw;
    word-wrap: break-word;
    font-size: ${props => props.theme.fontSizes.medium};
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        width: 100%;
        padding: 0;
        border-bottom: 1px solid ${props => props.theme.colors.grey};
        :first-of-type {
            border-top: 1px solid ${props => props.theme.colors.grey};
        }
    }
`;
