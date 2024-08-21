// utils/csrf.ts
export function getCsrfToken() {
  if (typeof document !== "undefined") {
    const csrfCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("csrftoken="));
    if (csrfCookie) {
      return csrfCookie.split("=")[1];
    } else {
      console.error("CSRF token not found in cookies");
      return null;
    }
  }
  console.error("Not running in the browser environment");
  return null;
}
