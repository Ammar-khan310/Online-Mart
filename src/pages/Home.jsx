import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import products from "../data/product";

const Home = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="hero">
          <p className="hero-tag">WELCOME TO MARTLY</p>
          <h1>Everything You Need, In One Place.</h1>
          <p>Discover your favourite products at affordable prices.</p>
        </section>

        <section className="shop-section">
          <div className="section-heading">
            <div>
              <h2>Our Products</h2>
              <p>Find something you love.</p>
            </div>

            <input
              className="search-input"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found. Try another search.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
