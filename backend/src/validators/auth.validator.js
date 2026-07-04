export const validateSignup = ({ username, email, password }) => {
  const errors = [];

  // Username Validation
  if (!username || username.trim() === "") {
    errors.push("Username is required.");
  } else if (username.trim().length < 3) {
    errors.push("Username must be at least 3 characters long.");
  }

  // Email Validation
  if (!email || email.trim() === "") {
    errors.push("Email is required.");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.push("Invalid email address.");
    }
  }

  // Password Validation
  if (!password) {
    errors.push("Password is required.");
  } else {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

    if (!passwordRegex.test(password)) {
      errors.push(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
  }

  if (errors.length > 0) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.errors = errors;

    throw error;
  }
};