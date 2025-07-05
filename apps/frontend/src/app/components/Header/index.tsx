import { useCartState } from '../../state/cart/cart-slice';
import { Input } from '../Input';
import * as S from './styles';
import { MdMenu, MdShoppingCart } from 'react-icons/md';

export const Header = () => {
  const { cartItems } = useCartState();

  return (
    <S.Container data-testid="header">
      <S.InputWrapper>
        <MdMenu size={22} color="#fff" data-testid="menu-icon" />
        <Input placeholder="Search for vegetables, fruits or meat." />
      </S.InputWrapper>
      <S.ShoppingBadge>
        <MdShoppingCart size={22} color="#064C4F" data-testid="cart-icon" />
        <span>{cartItems.size}</span>
      </S.ShoppingBadge>
    </S.Container>
  );
};
