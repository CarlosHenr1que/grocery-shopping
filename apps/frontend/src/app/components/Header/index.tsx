import { Input } from '../Input';
import * as S from './styles';
import { MdMenu, MdShoppingCart } from 'react-icons/md';

export const Header = () => {
  return (
    <S.Container>
      <S.InputWrapper>
        <MdMenu size={22} color="#fff" data-testid="menu-icon" />
        <Input placeholder="Search for vegetables, fruits or meat." />
      </S.InputWrapper>
      <S.ShoppingBadge>
        <MdShoppingCart size={22} color="#064C4F" data-testid="cart-icon" />
        <span>12</span>
      </S.ShoppingBadge>
    </S.Container>
  );
};
