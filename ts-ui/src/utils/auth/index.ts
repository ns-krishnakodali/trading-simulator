export const TS_TOKEN = "tstoken";

export const setAuthToken = (token: string): boolean => {
  if (token && typeof window !== "undefined") {
    localStorage.setItem(TS_TOKEN, token);
    return true;
  }
  return false;
};

export const getAuthToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem(TS_TOKEN) : null;

export const removeAuthToken = (): void => {
  localStorage.removeItem(TS_TOKEN);
};

export const isValidToken = (): boolean => {
  const authToken = getAuthToken();
  return typeof authToken === "string" && authToken.trim() !== "";
};
