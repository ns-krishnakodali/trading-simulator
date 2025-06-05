const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateLoginDetails = (
  email: string,
  password: string,
): [boolean, string] => {
  if (!email || !password) return [false, "All fields are required."];
  if (!isValidEmail(email)) return [false, "Invalid email format."];
  return [true, ""];
};

export const validateSignUpDetails = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
): [boolean, string] => {
  if (!username || !email || !password || !confirmPassword) {
    return [false, "All fields are required."];
  }
  if (!isValidEmail(email)) {
    return [false, "Invalid email format."];
  }
  if (password !== confirmPassword) {
    return [false, "Passwords do not match."];
  }
  return [true, ""];
};
