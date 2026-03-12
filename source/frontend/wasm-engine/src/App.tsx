import { useEffect } from "react";
import "./App.css";
import { getAuthStatus, loginUser } from "./services/auth-service";
import apiClient from "./lib/api-client";

function App() {
  useEffect(() => {
    const checkSystem = async () => {
  try {
    // Try to register a fresh user
    console.log("Registering new user...");
    await apiClient.post("/auth/register", {
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    });
    console.log("✅ Registration successful!");
  } catch (err) {
    console.log("User might already exist, moving to login...");
  }

  try {
    const response = await loginUser({ 
      email: "test@example.com", 
      password: "password123" 
    });
    console.log("✅ LOGIN SUCCESS! Data:", response);
  } catch (err) {
    console.error("❌ Still failing? Check the Backend terminal for errors.");
  }
};
    checkSystem();
  }, []);

  return <h1>Check the Console (F12) for the Auth Trace</h1>;;
}

export default App;
