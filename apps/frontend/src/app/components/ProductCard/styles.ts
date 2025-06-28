import styled from 'styled-components';

export const Container = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  justify-content: center;
  align-items: center;
  padding: 20px 10px;

  img {
    height: 180px;
  }

  h2 {
    font-size: 16px;
    font-family: 'Inter-Bold';
  }

  h3 {
    font-size: 14px;
    font-family: 'Inter-Bold';
    margin-top: ${(props) => props.theme.spacing.lg};
  }
`;

interface ButtonContainerProps {
  inCart: boolean;
}

export const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;
  width: 100%;
  height: 38px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  justify-content: ${(props) => (props.inCart ? 'space-between' : 'center')};
  align-items: center;
  padding: 2px;
  margin-top: ${(props) => props.theme.spacing.sm};
`;

export const RoundButton = styled.button`
  display: flex;
  width: 28px;
  height: 28px;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  align-items: center;
  justify-content: center;

  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  outline: none;
`;
