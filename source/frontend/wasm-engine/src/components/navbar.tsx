import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav>
      <div className="flex flex-row justify-around gap-15 h-15 bg-[#8F8B8B] items-center px-20 pl-30 border-2 border-white">
        <h1 className="text-white font-bold text-3xl">BlinkFlow</h1>
        <Link className="text-white font-bold text-[17px]" to="/convert/merge">
          MERGE PDF
        </Link>
        <Link className="text-white font-bold text-[17px]" to="/convert/combine">
          COMBINE PDF
        </Link>
        <Link className="text-white font-bold text-[17px]" to="/convert/compress">
          COMPRESS PDF
        </Link>
        <Link className="text-white font-bold text-[17px]" to="/convert/split">
          SPLIT PDF
        </Link>
        <Link className="text-white font-bold text-[17px]" to="/convert/to-pdf">
          TO-PDF
        </Link>
        <Button className="bg-[#575555] font-bold p-5 text-sm relative left-13">Sign Up</Button>
        <Button className="bg-[#575555] font-bold p-5 text-sm">Log In</Button>
      </div>
    </nav>
  );
};

export default NavBar;
