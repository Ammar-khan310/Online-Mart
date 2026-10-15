import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-info">
        <p className="category">{product.category}</p>

        <h3>{product.name}</h3>

        <p className="price">Rs. {product.price.toLocaleString("en-PK")}</p>

        <button
          className="add-btn"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
