import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css";
import NavBar from "./components/navbar";
import Dashboard from "./components/dashboard";


function App() {
 

  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
