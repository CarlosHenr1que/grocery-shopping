import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
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
