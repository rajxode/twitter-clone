

export default function SingleUser(props) {

    const {name,email} = props.user;
    
    return(
        <>
            <div className="w-full p-1 h-[50px] my-1 flex justify-between">
                
                <div className="w-[42px] bg-green-300 h-full rounded-full">

                </div>
                
                <div className="w-[50%] px-1 h-full flex flex-col justify-start">
                    <span className="font-semibold">
                        {name}
                    </span>
                    <span className="text-sm text-slate-500">
                        {email}
                    </span>
                </div>
                
                <div className="w-auto  h-full flex justify-center items-center">
                    <button className="rounded-full px-2 py-[2px] bg-black text-white font-semibold shadow-md">
                        Follow
                    </button>
                </div>
            </div>
        </>
    )
}