import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => props.theme.spacing.xl};
  @media (max-width: 600px) {
    padding-inline: 8px;
  }
`;

export const Grid = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding-top: ${(props) => props.theme.spacing.xl};
  gap: ${(props) => `${props.theme.spacing.lg} ${props.theme.spacing.sm}`};

  @media (max-width: 600px) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
`;
