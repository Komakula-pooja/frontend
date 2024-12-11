import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@komakula/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Auth=({type}:{type: "signup" | "signin"})=>{
    const navigate = useNavigate();
    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        username:"",
        password:""
    });

    async function sendRequest(){
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs
            );

            if (type === "signup") {
                const jwt = response.data;
                localStorage.setItem("token", jwt);
                localStorage.setItem("userName", postInputs.username);
                alert("Signup successful. Please sign in.");
                navigate("/signin");
            } else {
                const jwt = response.data;
                localStorage.setItem("token", jwt);
                localStorage.setItem("userName", postInputs.username);
                // alert("Signup successful. Please sign in.");
                navigate("/blogs");
            }
        } catch (e) {
            alert(`Error while ${type === "signup" ? "signing up" : "signing in"}`);
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-4xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-500">
                        {type==="signin"?"Don't have an account?": "Already have an account?" }
                        <Link className="pl-2 underline" to={type==="signin" ?"/signup" :"/signin"}>
                        {type==="signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-8">
                {type === "signup" && (
                    <LabelledInput 
                        label="Name" 
                        placeholder="Sunflower.." 
                        onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })} 
                        id="name-input" 
                    />
                )}
                    <LabelledInput 
                        label="Username" 
                        placeholder="sunflower@gmail.com" 
                        onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })} 
                        id="username-input" 
                    />
                    <LabelledInput 
                        label="Password" 
                        type="password" 
                        placeholder="Atleast 6 characters.." 
                        onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} 
                        id="password-input" 
                    />
                    <button onClick={(e) => {
                        e.preventDefault(); 
                        sendRequest();
                    }} type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                     focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 
                     dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType{
    label: string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string;
    id:string;
}

function LabelledInput({label, placeholder, onChange, type, id}:LabelledInputType){
    return <div>
         <label htmlFor={id} className="block mb-2 text-sm text-black font-semibold pt-4">{label}
         </label>
         <input onChange={onChange}  type={type || "text"} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 
         text-sm rounded-lg focus:ring-blue-500 focus:border-red-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

