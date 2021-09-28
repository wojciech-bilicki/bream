import { createContext } from "react";
import { UserData } from "./auth.api";

interface IAuthContext {
  userData?: UserData;
  setUserData: (userData: UserData | undefined) => void;
}

export const AuthContext = createContext<Partial<IAuthContext>>({});
AuthContext.displayName = "AuthContext";
