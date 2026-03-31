import { create } from "zustand"
import type { LoginType, RegisterType } from "../types/auth-type";
import API from "../lib/api-client";
import { toast } from "sonner";

interface AuthContext {
  user: string | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isAuthStatusLoading: boolean;


  register: (data: RegisterType) => void;
  login: (data: LoginType) => void;
  logout: () => void;
  isAuthStatus: () => void;
}


export const useAuth = create<AuthContext>()((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isAuthStatusLoading: false,


  register: async (data: RegisterType) => {
     set({ isSigningUp: true });
    try {
      const response = await API.post("/auth/register", data);
      set({user: response.data.user});
      toast.success("Register successfully")
    } catch (e: any) {
      toast.error(e.response?.data?.message);
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data: LoginType) => {
    set({isLoggingIn: true});
    try {
      const response = await API.post("/auth/login", data);
      set({user: response.data.user});
      toast.success("Login successfully");
    } catch (e: any) {
      toast.error(e.response?.data?.message);
    } finally {
      set({ isLoggingIn: false })
    }
  },

  logout: async () => {
    try {
      await API.post("/auth/logout");
      set({ user: null });
      toast.success("Logout successfully")
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Register failed");
    }
  },

  isAuthStatus: async () => {
    set({isAuthStatusLoading: true});
    try {
      const response = await API.post("/auth/status");
      set({ user: response.data.user });
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Authentication failed");
      console.log(e);
    } finally {
      set({ isAuthStatusLoading: false });
    }
  }

}))