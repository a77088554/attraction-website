import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import type { User } from "../../types/user"
import { useEffect } from "react"

function Title({isLogin, setIsLogin, user, setUser, menuOpen, setMenuOpen}: {isLogin: boolean, setIsLogin: React.Dispatch<React.SetStateAction<boolean>>, user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>>, menuOpen: boolean, setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    // const [menuOpen, setMenuOpen] = useState(false)
    
    // 點擊選單外取消menu
    useEffect(()=>{
        const handleClickOutside = ()=> setMenuOpen(false)
        if(menuOpen){
            window.addEventListener("click", handleClickOutside)
        }
        return ()=> window.removeEventListener("click", handleClickOutside)
    },[menuOpen, setMenuOpen])

    const handleLogout = ()=>{
        googleLogout()
        setUser(null)
        setIsLogin(false)
        alert("已登出")
    }

    return(
        <>
            <div className="bg-[#FFF4C1] font-bold text-xl w-full flex justify-between px-5 py-3 items-center">
                <h1>觀光景點推薦網站</h1>
                {/* <p className="max-sm:hidden"><Link to="/login">{isLogin? `Hi, 使用者`: "登入"}</Link></p> */}
                <button 
                    className="sm:hidden text-2xl hover:bg-gray-300 duration-300 px-2 py-1 rounded" 
                    onClick={(e)=>{
                        e.stopPropagation()
                        setMenuOpen(prev=>!prev)
                    }}
                >
                        ≡
                </button>
                <div className="max-sm:hidden">
                    {!isLogin?
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const user = jwtDecode<{email: string, name:string}>(credentialResponse.credential ?? '')
                                alert(`登入成功，歡迎 ${user.name}`)
                                setUser({email: user.email, name: user.name})
                                setIsLogin(true)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            useOneTap
                        />:
                        <div className="flex-col-center max-sm:hidden">
                            <div>Hi, {user?.name}</div>
                            <button onClick={handleLogout}>登出</button>
                        </div>
                    }
                </div>
            </div>
            {menuOpen && (
                <div className="bg-[#FFFCEC] shadow-md font-bold text-xl flex-col-center pb-3">
                    {!isLogin ?
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const user = jwtDecode<{email: string, name:string}>(credentialResponse.credential ?? '')
                                alert(`登入成功，歡迎 ${user.name}`)
                                setUser({email: user.email, name: user.name})
                                setIsLogin(true)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            useOneTap
                        />:
                        <div className="flex-col-center">
                            <div>Hi, {user?.name}</div>
                            <button onClick={handleLogout}>登出</button>
                        </div>
                    }
                </div>
            )}
        </>
    )
}

export default Title