function Header(){
    return(
        <>
            <div className="sm:flex justify-center items-center">
                <div className="relative left-4 sm:max-w-[30dvw]  w-[80dvw]">
                    <h1 className="sm:text-3xl text-2xl">各地觀光景點推薦網站</h1>
                    <p>難得的休假卻為了找到美好的地方，美好的景點，因此創建此網站就是為了節省人們的時間。</p>
                </div>
                <img 
                    src="https://decing.tw/wp-content/uploads/20190124084958_35.jpg" 
                    alt="台南安平-河童町故事館" 
                    className="sm:relative sm:left-[10%] sm:w-[60dvw] max-sm:hidden rounded-l-full"
                    style={{
                        maskImage: "linear-gradient(to left, black 70%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to left, black 70%, transparent 100%)"
                    }}
                />
            </div>
        </>
    )
}

export default Header