

// dummy info about the application
export default function Theme() {

    return(
        <>
            <div className="w-full h-full flex flex-col">
                <div className="w-full h-[45px] flex items-center px-2 bg-slate-200 
                        border-b border-slate-400 text-lg font-semibold dark:bg-slate-500 dark:text-white">
                    Theme
                </div>
                <div className="mt-2 p-2 text-xl">
                    <form>
                        <input type="radio" id="light" value="light" name="theme" defaultChecked className="mr-1 cursor-pointer"/>
                        <label for='light'>Light</label>
                        <br />
                        <input type="radio" id="dark" value="dark" name="theme" className="mr-1 cursor-pointer"/>
                        <label for='dark'>Dark</label>
                    </form>
                </div>
            </div>
        </>
    )
}