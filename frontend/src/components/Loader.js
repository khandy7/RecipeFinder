const Loader = () => {
    let circleCommonClasses = 'h-5 w-5 bg-white rounded-full border-4 border-black';

    return (
        <div className="h-screen flex">
            <div className="m-auto">
                <div className='flex'>
                    <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                    <div
                        className={`${circleCommonClasses} mr-1 animate-bounce200`}
                    ></div>
                    <div className={`${circleCommonClasses} animate-bounce400`}></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;