
import { useSelector } from 'react-redux';
import SideBar from '../Components/SideBar';
import { authSelector } from '../Redux/Reducers/authReducer';

export default function Profile(){

    const { loggedInUser } = useSelector(authSelector);

    return(
        <div className="h-full w-[78%] flex justify-between">
            <div className=" w-[68%] rounded shadow-md flex flex-col">

                <div className='w-full h-[45px] px-2 flex items-center bg-slate-200'>
                    <span className='font-semibold'>
                        {loggedInUser.name}    
                    </span>
                    
                </div>

                <div>

                </div>
            </div>

            <SideBar parent={'profile'} />
        </div>
    )
}