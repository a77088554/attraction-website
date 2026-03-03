import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import useCreateFavorites from "../../hooks/useCreateFavorites"

function Title(){
    useCreateFavorites()
    const menuRef = useRef<HTMLDivElement>(null)
    const {IsLogin, setIsLogin, User, setUser, MenuOpen, setMenuOpen} = useContext(AuthContext)
    
    // 點擊選單外取消menu
    useEffect(()=>{
        const handleClickOutside = (e: MouseEvent)=>{
            if(menuRef.current && !menuRef.current.contains(e.target as Node)){
                setMenuOpen(false)
            }
        }
        if(MenuOpen){
            window.addEventListener("mousedown", handleClickOutside)
        }
        return ()=> window.removeEventListener("mousedown", handleClickOutside)
    },[MenuOpen, setMenuOpen])

    const handleLogout = ()=>{
        googleLogout()
        setUser({email: '', name: '', attraction: '', location: '', city: ''})
        setIsLogin(false)
        alert("已登出")
    }

    return(
        <div className="w-full" ref={menuRef}>
            <div className="title-bg-text-color font-bold text-2xl w-full flex justify-between px-5 py-3 items-center">
                <h1 className="text-2xl font-bold tracking-wide my-3">觀光景點推薦網站</h1>
                <button 
                    className="sm:hidden text-2xl hover:bg-gray-500 duration-300 px-2 py-1 rounded" 
                    onClick={(e)=>{
                        e.stopPropagation()
                        setMenuOpen(prev=>!prev)
                    }}
                >
                        ≡
                </button>
                <div className="max-sm:hidden">
                    {!IsLogin?
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const user = jwtDecode<{email: string, name:string}>(credentialResponse.credential ?? '')
                                alert(`登入成功，歡迎 ${user.name}`)
                                setUser({email: user.email, name: user.name, attraction: '', location: '', city: ''})
                                setIsLogin(true)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            useOneTap
                        />:
                        <div className="flex-col-center max-sm:hidden">
                            <div>Hi, {User?.name}</div>
                            <button onClick={handleLogout}>登出</button>
                        </div>
                    }
                </div>
            </div>
            <div 
                className={`title-bg-text-color sm:hidden w-full shadow-2xl font-bold text-xl flex-col-center transition-all duration-300 ${MenuOpen? 'opacity-100 py-3 mb-3 ': 'opacity-0 h-0'}`}>
                {!IsLogin ?
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const user = jwtDecode<{email: string, name:string}>(credentialResponse.credential ?? '')
                            alert(`登入成功，歡迎 ${user.name}`)
                            setUser({email: user.email, name: user.name, attraction: '', location: '', city: ''})
                            setIsLogin(true)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />:
                    <div className="flex-col-center">
                        <div>Hi, {User?.name}</div>
                        <button onClick={handleLogout}>登出</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Title