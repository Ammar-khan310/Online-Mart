import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const changeQuantity = (item, quantity) => {
    if (quantity < 1) return;

    dispatch(
      updateQuantity({
        id: item.id,
        quantity,
      }),
    );
  };

  return (
    <>
      <Navbar />

      <main className="container cart-container">
        <h1 className="page-title">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty!</h2>
            <p>Looks like you haven't added any products yet.</p>

            <Link to="/" className="shop-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>Rs. {item.price.toLocaleString("en-PK")}</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() => changeQuantity(item, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => changeQuantity(item, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <strong>
                      Rs. {(item.price * item.quantity).toLocaleString("en-PK")}
                    </strong>

                    <button
                      className="remove-btn"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>

              <div className="total-row">
                <span>Total</span>
                <strong>Rs. {totalPrice.toLocaleString("en-PK")}</strong>
              </div>

              <button
                className="clear-btn"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>

              <Link to="/" className="continue-btn">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Cart;
