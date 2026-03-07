import { useEffect } from "react";
import "./App.css";
import { getAuthStatus } from "./services/auth-service";

function App() {
  useEffect(() => {
    const checkSystem = async () => {
      try {
        const data = await getAuthStatus();
        console.log("Connection success", data.user.email);
      } catch (err) {
        console.log("Connection failed or not logged in", err);
      }
    };
    checkSystem();
  }, []);

  return <div>Logic testing mode... open console</div>;
}

export default App;
