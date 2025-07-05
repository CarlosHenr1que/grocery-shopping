import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  height: 50px;
  padding: 16px;
  align-items: center;
  justify-content: space-between;

  input {
    width: 100%;
    text-decoration: none;
    border: 0px;
    color: ${(props) => props.theme.colors.textPrimary};
    font-size: 14px;
    ::placeholder {
      ${(props) => props.theme.colors.textSecondary};
    }
  }

  @media (max-width: 600px) {
    width: 100%;

    input: {
    }

    .icon {
      display: none;
    }
  }
`;
