import { Outlet } from "react-router-dom"
import SignleMenuOption from "../Components/SingleMenuOption"


export default function Settings(){

    const menuOptions = [{name:'Update Info',icon:<i class="fa-solid fa-pen-to-square"></i>,link:'/home/settings/'},
                        {name:'Update Password',icon:<i class="fa-solid fa-key"></i>,link:'/home/settings/updatepassword'},
                        {name:'Delete Accout',icon:<i class="fa-solid fa-trash"></i>,link:'/home/settings/deleteaccount'},
                        {name:'About',icon:<i class="fa-solid fa-circle-info"></i>,link:'/home/settings/about'},
                    ]

    return(
        <div className="h-full w-[78%] flex justify-between">
            <div className="w-[30%] h-full">
                <div className="text-xl font-bold w-full h-[45px] mt-2 p-1 border-b border-slate-300">
                    Settings
                </div>
                {
                    menuOptions.map((menu,i) => <SignleMenuOption key={i} menu={menu} />)
                }
            </div>
            <div className="w-2/3 h-full rounded">
                <Outlet />
            </div>
        </div>
    )
}