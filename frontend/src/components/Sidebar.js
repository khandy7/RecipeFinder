import React from "react";
function Sidebar() {


    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


    return (
        <div className="flex flex-no-wrap">
            <div className="w-30 absolute sm:relative md:h-full flex-col justify-between flex">
                <div className="px-8">
                    <ul className="text-black">
                        {
                            letters.map((i) => {
                                return <li key={i.apiID}>
                                    <div className="">
                                        {i}
                                    </div>
                                  </li>;
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;