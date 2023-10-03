import { NavLink } from "react-router-dom";


export default function SignleMenuOption(props) {

    const { name, icon, link } = props.menu;

    return(
        <>
            <div className="w-full h-[45px] p-1 my-1 text-xl font-semibold flex
                    items-center hover:bg-[#f7f5f5] hover:rounded hover:shadow-md">
                <NavLink to={link} >
                    <span>
                        {icon}
                    </span>
                    &nbsp;
                    <span>
                        {name}
                    </span>
                </NavLink>
            </div>
        </>
    )
}