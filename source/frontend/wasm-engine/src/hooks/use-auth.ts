import { useState, useEffect } from "react";
import { getAuthStatus } from "../services/auth-service";



export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const checkStatus = async () => {
    try {
      const data = await getAuthStatus();
      setUser(data.user);
    } catch (e) {
      setUser(null)
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  checkStatus();
}, []);

return {user, loading, checkStatus};
};