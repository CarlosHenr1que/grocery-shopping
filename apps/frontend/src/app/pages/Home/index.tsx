import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../models/Product';
import * as S from './styles';

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://10.10.11.13:3001/products', {
    method: 'get',
  });

  const products = await response.json();
  return products;
};

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Map<string, { quantity: number }>>(
    new Map()
  );

  const onAddProduct = (id: string) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const existingItem = newCart.get(id) ?? { quantity: 0 };

      newCart.set(id, {
        quantity: existingItem.quantity + 1,
      });

      return newCart;
    });
  };

  const onRemoveProduct = (id: string) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const existingItem = newCart.get(id);

      if (existingItem) {
        if (existingItem.quantity <= 1) {
          newCart.delete(id);
        } else {
          newCart.set(id, {
            quantity: existingItem.quantity - 1,
          });
        }
      }

      return newCart;
    });
  };

  useEffect(() => {
    const handleGetProducts = async () => {
      const productsResponse = await getProducts();
      setProducts(productsResponse);
    };
    handleGetProducts();
  }, []);

  return (
    <S.Container>
      <S.Grid>
        {products.map((product) => {
          const quantity = cart.get(product.id)?.quantity ?? 0;
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
