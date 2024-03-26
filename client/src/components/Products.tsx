import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCreditCard } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { fetchProducts, searchQuery } from '../redux/products/productsSlice';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

function Products(): JSX.Element {
  const dispatch = useDispatch();
  const products: Product[] = useSelector((state: { products: { products: Product[] } }) => state.products.products);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearch(value);
    dispatch(searchQuery(value));
  };

  const handlePurchase = async (productData: Partial<Product>): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        toast.success('Item purchased successfully');
      } else {
        toast.error('Failed to purchase item');
      }
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    }
  };

  return (
    <div data-testid="productsPage">
      <ToastContainer />
      <div className="search">
        <input
          className="input"
          type="text"
          onChange={handleSearch}
          placeholder="Search products"
          value={search}
        />
      </div>
      <div className="products-container">
        <div className="products-grid">
          {products
            .filter((product) => {
              if (search === '') {
                return product;
              }
              if (product.title.toLowerCase().includes(search.toLowerCase())
                || product.category.toLowerCase().includes(search.toLowerCase())
                || product.price.toString().includes(search)) {
                return product;
              }
              return null;
            })
            .map((product, index) => (
              <div className={`products-item ${index % 2 === 0 ? 'background-1' : 'background-2'}`} key={product.id}>
                <img src={product.image} alt="" />
                <h3>{product.title}</h3>
                <div className="price-category">
                  <p>{product.category}</p>
                  <p>
                    $
                    {product.price}
                  </p>
                  <br />
                  <p>
                    {product.rating.rate}
                    *
                  </p>
                </div>
                <div className="view-more">
                  <span>
                    Rated by
                    &nbsp;
                    {product.rating.count}
                    &nbsp;
                    customers
                  </span>
                  <BsCreditCard
                    style={{ cursor: 'pointer' }}
                    title="Click To Buy"
                    onClick={() => handlePurchase({
                      productId: product.id,
                      title: product.title,
                      price: product.price,
                      category: product.category,
                    })}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
