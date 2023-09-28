import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SignUp() {
    
    const [isNextClicked,setIsNextClicked] = useState(false);

  return (
    <>
      <div
        className="absolute bg-slate-200 opacity-50 p-2 h-full w-full 
                            rounded shadow-md flex justify-center items-center"
      ></div>
      <div
        className="absolute bg-white h-4/5 w-2/5 p-2 
                            rounded-md shadow-md flex flex-col justify-between"
      >
        <div className="w-full h-[7%] flex">
          <NavLink to="/">
            <button className=" w-[25px] rounded-full hover:bg-gray-300 transition ease-in-out">
              X
            </button>
          </NavLink>
          <div
            className="h-full w-full flex justify-center 
                                    items-center"
          >
            <img
              src={require("../Assets/logo.png")}
              alt="logo"
              className="h-full w-auto"
            />
          </div>
        </div>

        <div className="w-full h-[90%] p-2 flex justify-center items-center">
          <div className="flex w-2/3 h-full flex-col justify-around">
            
            <div className="text-3xl w-full font-semibold">Create your account</div>

            <div className="w-full h-full">
                
                <form className="w-full h-full p-3">

                    { !isNextClicked ? 
                        <>
                            <input
                            type="email"
                            placeholder="Email address"
                            required
                            className="border rounded border-slate-400 px-2 
                                    w-full h-[12%] my-4"
                            />

                            <input
                            type="email"
                            placeholder="Email address"
                            required
                            className="border rounded border-slate-400 px-2 
                                    w-full h-[12%] my-4"
                            />

                            <div>
                                <h1 className="font-bold">
                                    Date of birth
                                </h1>
                                <p className="leading-tight text-slate-500 text-sm">
                                    This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
                                </p>
                            </div>

                            <div className="w-full my-4 h-[15%] py-1">
                                <select name="" id="" className="w-[45%] h-[90%] border border-slate-400 rounded mx-1">Month</select>
                                <select name="" id="" className="w-[20%] h-[90%] border border-slate-400 rounded mx-1">Day</select>
                                <select name="" id="" className="w-[25%] h-[90%] border border-slate-400 rounded mx-1">Year</select>
                            </div>

                            <button className="w-full h-[10%] mb-0 bg-black 
                                    text-white font-semibold rounded-full" 
                                    onClick={() => setIsNextClicked(true)}>
                                Next
                            </button>
                        </>
                        :
                        <>

                            <div className="w-full h-1/2 flex justify-center items-center">
                                <div className="w-[62%] h-full rounded-full border flex justify-center items-center">
                                    <input
                                    type="file"
                                    required
                                    className="w-full h-full rounded-full"
                                    />         
                                </div>
                            </div>

                            <input
                            type="password"
                            placeholder="Password"
                            required
                            className="border rounded border-slate-400 px-2 
                                    w-full h-[12%] my-4"
                            />

                            <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            className="border rounded border-slate-400 px-2 
                                    w-full h-[12%] my-4"
                            />


                            <button className="w-full h-[10%] mb-0 bg-black 
                                    text-white font-semibold rounded-full" 
                                    >
                                Create your account
                            </button>
                        </>
                    }
                </form>
            </div>
            </div>
          </div>
        </div>
    </>
  );
}
