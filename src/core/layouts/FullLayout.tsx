import React, { cloneElement, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Title from "./components/Title"
import { UserModel } from "./types/UserType"
import GoTopFunction from "./components/GoTopFunction"

function FullLayout({ children }: { children: React.ReactNode }){
    const [menuOpen, setMenuOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState<UserModel>({email: '', name: '', attraction: '', location: '', city: ''})

    return(
        <div className="w-full font-bold flex-col-center overflow-x-hidden">
            <Title isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <Header/>
            {cloneElement(children as React.ReactElement<{isLogin: boolean, user: UserModel}>, {isLogin: isLogin, user: user})}
            <Footer/>
            <button className="fixed bottom-5 right-5 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700 duration-300" onClick={GoTopFunction}>Top</button>
        </div>
    )
}

export default FullLayout