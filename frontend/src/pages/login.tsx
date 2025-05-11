import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "@/utils/axios";
import { validateAuthForm, ValidationErrors } from "@/utils/validateAuthForm";
import Loader from "../components/Loader";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = validateAuthForm(email, password, undefined, "login");

    if (!isValid) {
      setFormErrors(errors);
      setError("");
      return;
    }

    setFormErrors({});
    setLoading(true);
    try {
      const res = await axios.post("auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      router.push("/chat");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          {formErrors.email && <p className="error-message">{formErrors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && <p className="error-message">{formErrors.password}</p>}
        </div>

        <button
          type="submit"
          className={`auth-button ${loading ? "deactive" : ""}`}
          disabled={loading}
        >
          {loading ? <Loader width="16px" height="16px" /> : "Login"}
        </button>
      </form>

      <div className="auth-link">
        <span>Don't have an account? </span>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
