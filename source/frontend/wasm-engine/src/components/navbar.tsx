import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import navBar from "../assets/nav-image.png";
const NavBar = () => {
  return (
    <nav>
      <div className="flex flex-row justify-around gap-10 w-screen h-15 bg-[#8F8B8B] items-center pl-20 border-3 border-white">
        <img className = "w-10 h-10 relative right-20" src = {navBar}/>
        <Link className="text-white font-bold text-3xl relative right-28 " to= "/">BlinkFlow</Link>
        <Link className="text-white font-bold text-[17px] relative right-10 hover:text-[#e7e2e2] cursor-pointer" to="/convert/merge">
          MERGE PDF
        </Link>
        <Link className="text-white font-bold text-[17px] relative right-10 hover:text-[#e7e2e2] cursor-pointer" to="/convert/combine">
          COMBINE PDF
        </Link>
        <Link className="text-white font-bold text-[17px] relative right-10 hover:text-[#e7e2e2] cursor-pointer" to="/convert/compress">
          COMPRESS PDF
        </Link>
        <Link className="text-white font-bold text-[17px] relative right-10 hover:text-[#e7e2e2] cursor-pointer" to="/convert/split">
          SPLIT PDF
        </Link>
        <Link className="text-white font-bold text-[17px] relative right-10 hover:text-[#e7e2e2] cursor-pointer" to="/convert/to-pdf">
          TO-PDF
        </Link>
        <Link to = "/sign-up"><Button className="bg-[#575555] font-bold p-5 text-sm relative left-5 hover:scale-105 transition-all duration-300 cursor-pointer">Sign Up</Button></Link>
        <Link to = "/log-in"><Button className="bg-[#575555] font-bold p-5 text-sm relative right-5 hover:scale-105 transition-all duration-300 cursor-pointer">Log In</Button></Link>
      </div>
    </nav>
  );
};

export default NavBar;
