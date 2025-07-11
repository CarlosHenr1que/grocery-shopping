import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../models/Product';
import * as S from './styles';
import { Selection } from '../../components/Selection';
import { useCartState } from '../../state/cart/cart-slice';
import { getProductsRequest } from '../../services';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItems, addCartItem, removeCartItem } = useCartState();

  const onAddProduct = (id: string) => {
    addCartItem(id);
  };

  const onRemoveProduct = (id: string) => {
    removeCartItem(id);
  };

  useEffect(() => {
    const handleGetProducts = async () => {
      const productsResponse = await getProductsRequest();
      if (productsResponse) {
        setProducts(productsResponse);
      }
    };
    handleGetProducts();
  }, []);

  return (
    <S.Container>
      <Selection
        text="All categories"
        active
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <S.Grid>
        {products.map((product) => {
          const quantity = cartItems.get(product.id)?.quantity ?? 0;
          return (
            <ProductCard
              product={product}
              quantity={quantity}
              inCart={quantity > 0}
              onAddClick={onAddProduct}
              onRemoveClick={onRemoveProduct}
            />
          );
        })}
      </S.Grid>
    </S.Container>
  );
};
