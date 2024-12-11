
import { Link } from "react-router-dom";
import { User, LassoSelect,  House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Appbar = () => {
    const navigate = useNavigate();
    
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate('/signin'); 
    }

    return (
        <div className="sticky top-0 border-b flex flex-wrap items-center justify-between px-4 sm:px-8 md:px-16 py-3 bg-slate-300 z-50 shadow-md">
            <Link to="/blogs" className="flex items-center space-x-2 mb-2 sm:mb-0">
                <LassoSelect className="h-6 w-6" />
                <span className="font-semibold text-lg">Medium</span>
            </Link>

            <div className="flex flex-wrap items-center space-x-4">
                <button
                    type="button" onClick={handleLogout}
                    className="text-white bg-black hover:bg-gray-400 focus:outline-none 
                    focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2 text-center transition-all duration-300">
                    Logout
                </button>

                <Link to="/blogs" className="px-2">
                    <House className="h-5 w-5" />
                </Link>
                {/* <Link to="/search" className="relative group px-2">
                    <Search className="h-5 w-5 transition-transform duration-300 ease-in-out transform group-hover:scale-110" />
                </Link> */}
                <Link to="/profile" className="relative group px-2">
                    <User className="h-5 w-5 transition-transform duration-300 ease-in-out transform group-hover:scale-110" />
                </Link>
            </div>
        </div>
    );
};
