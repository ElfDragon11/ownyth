import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}


export const useAuth = create<AuthState>((set) => ({

    isAuthenticated: !!localStorage.getItem("authToken"), 
    
    login: async (username, password) => {
      const response = await fetch("/server/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (result.success) {
        localStorage.setItem("authToken", result.token);
        set({ isAuthenticated: true });
        return true;
      }
      return false;
    },
    logout: () => {
      localStorage.removeItem("authToken");
      set({ isAuthenticated: false });
    },
  }));