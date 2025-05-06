import { useState } from "react";
import { useRouter } from "next/router";
import axios from "@/utils/axios";
import { validateAuthForm, ValidationErrors } from "@/utils/validateAuthForm";
import Loader from "../components/Loader";

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = validateAuthForm(email, password, confirmPassword);
    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setLoading(true);
    try {
      const res = await axios.post("auth/signup", { email, password });
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
      <h2 className="auth-title">Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="form-group">
          <label htmlFor="confirm_pass">Confirm Password</label>
          <input
            type="password"
            id="confirm_pass"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {formErrors.confirmPassword && (
            <p className="error-message">{formErrors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className={`auth-button ${loading ? "deactive" : ""}`}
          disabled={loading}
        >
          {loading ? <Loader width="16px" height="16px" /> : "Sign Up"}
        </button>
      </form>

      <div className="auth-link">
        <span>Already have an account? </span>
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default SignupPage;
