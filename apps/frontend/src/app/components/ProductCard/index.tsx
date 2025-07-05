import React from 'react';
import { Product } from '../../models/Product';
import * as S from './styles';
import { MdRemove, MdAdd } from 'react-icons/md';

export interface Props {
  product: Product;
  quantity: number;
  inCart: boolean;
  onAddClick: (id: string) => void;
  onRemoveClick: (id: string) => void;
}

const Content = React.memo(({ product }: { product: Props['product'] }) => {
  return (
    <S.Card>
      <img src={product.imageUrl} alt="product_image" />
      <h2>{product.name}</h2>
      <h3>{product.price}</h3>
    </S.Card>
  );
});

export const ProductCard = ({
  product,
  quantity,
  inCart,
  onAddClick,
  onRemoveClick,
}: Props) => {
  return (
    <S.Container data-testid="product-card">
      <Content product={product} />
      <S.ButtonContainer $inCart={inCart}>
        {inCart && (
          <>
            <S.RoundButton
              data-testid="product-card-remove-button"
              onClick={() => onRemoveClick(product.id)}
            >
              <MdRemove />
            </S.RoundButton>
            <S.RoundButton>{quantity}</S.RoundButton>
          </>
        )}
        <S.RoundButton
          data-testid="product-card-add-button"
          onClick={() => onAddClick(product.id)}
        >
          <MdAdd />
        </S.RoundButton>
      </S.ButtonContainer>
    </S.Container>
  );
};
