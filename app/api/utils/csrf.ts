// utils/csrf.ts
export function getCsrfToken() {
  if (typeof document !== "undefined") {
    console.log(document.cookie);
    const csrfCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.trim().startsWith("csrftoken="));
    console.log(csrfCookie);
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
