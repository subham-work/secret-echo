export interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export const validateAuthForm = (
  email: string,
  password: string,
  confirmPassword?: string,
  mode: "login" | "signup" = "signup" // default to signup for full validation
): ValidationResult => {
  const errors: ValidationErrors = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (mode === "signup") {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address.";
    }
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (mode === "signup") {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{6,}$/;
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    } else if (!passwordRegex.test(password)) {
      errors.password = "Password must include uppercase, lowercase, and a special character.";
    }
  }

  if (mode === "signup" && confirmPassword !== undefined) {
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
