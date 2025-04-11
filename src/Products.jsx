import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data); 
      })
      .catch(err => console.error(err));

    
    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  
  const filterByCategory = (category) => {
    setActiveCategory(category);

    if (category === 'all') {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter(product =>
        product.category.toLowerCase().trim() === category.toLowerCase().trim()
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">My Store</h1>

      
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => filterByCategory('all')}
          className={`px-4 py-2 rounded-full transition ${
            activeCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          ALL
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className={`px-4 py-2 rounded-full transition ${
              activeCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-2xl p-4 shadow hover:shadow-lg transition">
            <img
              src={product.image}
              alt={product.title}
              className="w-28 h-28 object-contain mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-500 mt-1">${product.price}</p>

            
            <Link
              to={{
                pathname: `/product/${product.id}`,
                state: { product } 
              }}
              className="mt-4 block text-center text-blue-600 hover:text-blue-800 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
