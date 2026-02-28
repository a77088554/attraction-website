function Header(){
    return(
        <>
            <div className="relative w-full h-100 rounded-3xl overflow-hidden">
                <img
                    src="https://decing.tw/wp-content/uploads/20190124084958_35.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className="relative z-10 flex flex-col justify-center h-full px-12 text-white">
                    <h1 className="text-4xl font-bold">
                    探索屬於你的旅遊地圖
                    </h1>
                    <p className="mt-4 text-lg opacity-90">
                    發現、收藏、規劃下一趟旅程
                    </p>
                </div>
            </div>
        </>
    )
}

export default Header