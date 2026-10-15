import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Martly
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>

        <span className="welcome">Hi, {user?.name}</span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
