import { Link } from "react-router-dom";
import url1 from "../../public/images/Url2.png";

export default function FirstPage(){
    return(
        <div className="bg-gray-900 h-screen flex flex-col justify-center">
            <img src={url1} className="self-center "/>
            <Link to="/login" className="bg-gray-300 text-black text-xl font-semibold w-48 self-center py-2 rounded-full text-center">Login</Link>
        </div>
    )
}