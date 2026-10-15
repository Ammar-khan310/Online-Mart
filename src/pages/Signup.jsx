import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),

      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Include at least one uppercase letter")
        .matches(/[0-9]/, "Include at least one number")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
    }),

    onSubmit: async (values, { setFieldError }) => {
      const users = JSON.parse(localStorage.getItem("martlyUsers") || "[]");

      const emailExists = users.some(
        (user) => user.email === values.email.trim().toLowerCase(),
      );

      if (emailExists) {
        setFieldError("email", "This email is already registered");
        return;
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(values.password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const passwordHash = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      const newUser = {
        id: Date.now(),
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        passwordHash,
      };

      users.push(newUser);
      localStorage.setItem("martlyUsers", JSON.stringify(users));

      alert("Signup successful! Please login.");
      navigate("/login");
    },
  });

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
          Create Account
        </h1>

        <p className="text-center text-gray-500">
          Join Martly and start shopping!
        </p>

        <div>
          <input
            className={inputClass}
            type="text"
            name="name"
            placeholder="Full name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className={errorClass}>{formik.errors.name}</p>
          )}
        </div>

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
            placeholder="Password (8+ characters)"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={errorClass}>{formik.errors.password}</p>
          )}
        </div>

        <div>
          <input
            className={inputClass}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className={errorClass}>{formik.errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-purple-700 py-3 font-semibold text-white transition hover:bg-purple-800"
        >
          Create Account
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-purple-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
