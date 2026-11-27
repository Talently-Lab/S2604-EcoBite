// Public API of the auth module: the rest of the app only imports from here.
export { AuthLayout } from "./layouts/AuthLayout";
export { LoginPage } from "./pages/LoginPage";
export { RegisterPage } from "./pages/RegisterPage";
export { UserProvider, useUser } from "./context/UserContext";
export type { User, UserRole } from "./types";
