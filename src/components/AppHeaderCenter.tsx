import styled from 'styled-components';

export const AppHeaderCenter = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    @media only screen and (max-width: ${props => props.theme.maxWidths.smallMobile}) {
        width: 100%;
}
`;
