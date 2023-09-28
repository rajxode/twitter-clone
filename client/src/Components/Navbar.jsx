import { Outlet } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="w-screen h-screen bg-red-300 flex 
                        px-[5%] py-[2%] justify-between">

            <div className="bg-white w-1/5">
                This is the navbar
            </div>
            <Outlet />
        </div>
    );
}
