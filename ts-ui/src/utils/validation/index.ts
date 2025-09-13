export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
