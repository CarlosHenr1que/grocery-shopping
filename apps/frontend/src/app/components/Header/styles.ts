import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.md};
  height: 80px;
  padding: 40px 16px;
  align-items: center;
`;
