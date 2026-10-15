import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values, { setStatus }) => {
      const users = JSON.parse(localStorage.getItem("martlyUsers") || "[]");

      const email = values.email.trim().toLowerCase();

      const user = users.find((item) => item.email === email);

      if (!user) {
        setStatus("Invalid email or password");
        return;
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(values.password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const passwordHash = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      if (user.passwordHash !== hashArrayToHex(hashBuffer)) {
        setStatus("Invalid email or password");
        return;
      }

      dispatch(
        login({
          id: user.id,
          name: user.name,
          email: user.email,
        }),
      );

      navigate("/");
    },
  });

  function hashArrayToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-600";

  const errorClass = "mt-1 text-sm text-red-600";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-center text-3xl font-bold text-purple-700">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500">
          Login to your Martly account
        </p>

        <div>
          <input
            className={inputClass}
            type="email"
            name="email"
            placeholder="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={errorClass}>{formik.errors.email}</p>
          )}
        </div>

        <div>
          <input
            className={inputClass}
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={errorClass}>{formik.errors.password}</p>
          )}
        </div>

        {formik.status && <p className={errorClass}>{formik.status}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-purple-700 py-3 font-semibold text-white transition hover:bg-purple-800"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-purple-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
