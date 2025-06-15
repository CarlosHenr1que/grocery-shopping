import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.md};
  height: 80px;
  padding: 16px 40px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
  gap: 110px;

  @media (max-width: 600px) {
    gap: 10px;
    width: 100%;
  }
`;

export const ShoppingBadge = styled.div`
  display: flex;
  height: 60px;
  width: 60px;
  border-radius: 60px;
  background: #fff;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

  span {
    display: flex;
    width: 22px;
    height: 22px;
    background-color: #f98858;
    align-items: center;
    justify-content: center;
    border-radius: 22px;
    font-size: 10px;
    color: ${(props) => props.theme.colors.surface};
    position: absolute;
    top: 20px;
    right: 55px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;
