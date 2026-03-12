import {createContext, useContext, useEffect, useState} from "react";
import { getAuthStatus, loginUser, logoutUser } from "../services/auth-service";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getAuthStatus();
        setUser(response.data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);


const login = async (data:any) => {
  const response = await loginUser(data);
  setUser(response.data);
};

const logout = async() => {
  await logoutUser();
  setUser(null);
};

return (
  <AuthContext.Provider value = {{user, isLoading, login, logout}}>{children}</AuthContext.Provider>
);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}