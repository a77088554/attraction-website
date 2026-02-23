import { createContext, useMemo, useState } from "react";
import { UserModel } from "../../layouts/types/UserType";

type AuthContextType = {
    IsLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    User: UserModel;
    setUser: React.Dispatch<React.SetStateAction<UserModel>>;
    MenuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
}

const AuthContext = createContext<AuthContextType>({IsLogin: true} as AuthContextType)
    
function AuthProvider({ children }: { children: React.ReactNode }) {
    const [IsLogin, setIsLogin] = useState<boolean>(false)
    const [User, setUser] = useState<UserModel>({email: '', name: '', attraction: '', location: '', city: ''})
    const [MenuOpen, setMenuOpen] = useState<boolean>(false)
    const value = useMemo(()=>({
        IsLogin,
        setIsLogin,
        User,
        setUser,
        MenuOpen,
        setMenuOpen
    }),[IsLogin, User, MenuOpen])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }