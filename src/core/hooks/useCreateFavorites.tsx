import { useContext, useEffect } from "react"
import { supabase } from "../config/Supabase"
import { AuthContext } from "../context/AuthContext"

function useCreateFavorites(){
    const {IsLogin, User} = useContext(AuthContext)
    useEffect(()=>{
        if(IsLogin === false) return 
        const createFavorites = async()=>{
            const {error} = await supabase
                .from('favorites')
                .insert({email: User.email, attraction_id: JSON.stringify([])})
            if(error){
                alert('insert error')
            }
        }

        const checkFavorites = async()=>{
            const {data, error} = await supabase
                .from('favorites')
                .select('attraction_id')
                .eq('email', User.email)
            if(data && data.length === 0){
                createFavorites()
            }
            if(error){
                alert("create error")
            }
        }

        try{
            checkFavorites()
        }
        catch(error){
            console.log(error)
        }
    },[IsLogin, User.email])
}

export default useCreateFavorites