import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
          Loading Martly...
        </div>
      }
    >
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
