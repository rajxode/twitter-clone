import { NavLink } from "react-router-dom";

export default function SignIn() {
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
            <div className="text-3xl w-full font-semibold">Sign in to X</div>

            <div className=" w-full h-full flex flex-col py-3 my-3 items-start justify-center">
              <div className="w-full h-[15%] ">
                <button className="border border-slate-400 hover:bg-slate-100 w-full h-3/5 flex justify-center items-center rounded-full">
                  <img
                    src={require("../Assets/icons/google.png")}
                    alt="google"
                    className="h-[20px] w-[20px]"
                  />
                  <span>&nbsp; sign in with Google</span>
                </button>
              </div>

              <h2 className="text-center w-full">or</h2>

              <div className="w-full h-[35%]">
                <form className="w-full h-full p-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    className="border rounded border-slate-400 px-2 
                            w-full h-2/5 mb-2"
                  />

                  <button className="w-full h-[30%] mb-0 bg-black text-white font-semibold rounded-full">
                    Sign in
                  </button>
                </form>
              </div>

              <div className="w-full h-[15%] mt-1">
                <NavLink to="/">
                  <button className="border border-slate-400 w-full h-3/5 hover:bg-slate-100 text-black font-bold rounded-full">
                    Forget Password
                  </button>
                </NavLink>
              </div>

              <p className="font-bold pl-1">
                Don't have an Account?
                <a className="text-sky-400"> Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
