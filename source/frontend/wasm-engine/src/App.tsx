import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css";
import NavBar from "./components/navbar";
import Dashboard from "./components/dashboard";
import ToolPage from "./components/toolpage";


function App() {
 

  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path = "/convert/:toolId" element = {<ToolPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
