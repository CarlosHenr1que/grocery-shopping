import styled from 'styled-components';

interface ContainerProps {
  $active: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  width: fit-content;
  padding: 0px ${(props) => props.theme.spacing.md};
  flex-direction: row;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.surface : theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.full};
  height: 40px;
  align-items: center;
  justify-content: space-between;

  font-size: 10px;
  font-weight: 700;

  svg {
    font-size: 22px;
    margin-left: ${(props) => props.theme.spacing.md};
  }
`;
