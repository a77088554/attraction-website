import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../core/context/AuthContext"
import { supabase } from "../../../core/config/Supabase"

function useFavorites(){
    const {IsLogin, User} = useContext(AuthContext)
    const [Favorites, setFavorites] = useState<number[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // 搜索favorites的資訊
    useEffect(()=>{
        const fetchFavorites = async()=>{
            if(IsLogin === false){
                setFavorites([])
            }
            else{
                setLoading(true)
                setError(null)

                const {data, error} = await supabase
                .from('favorites')
                .select('attraction_id')
                .eq('email', User.email)
            
                if(error){
                    setError(error.message)
                }
                else if(data){
                    const parsedData = JSON.parse(data[0].attraction_id) // 初始為[]
                    const result: number[] = parsedData?.sort((a: number, b: number)=> a-b)
                    setFavorites(result)
                }
                setLoading(false)
            }
        }
        
        fetchFavorites()
    },[IsLogin])

    // 更新使用者所改變完後的收藏
    const UpdateFavorites = async(input:number[])=>{
        if(IsLogin === false){
            setFavorites([])
        }
        else{
            setLoading(true)
            setError(null)

            const previous = Favorites   
            setFavorites(input)
                
            const {error} = await supabase
                .from('favorites')
                .update({attraction_id: JSON.stringify(input)})
                .eq('email', User.email)
            if(error){
                setError(error.message)
                setFavorites(previous)
            }

            setLoading(false)
        }
    }

    return {Favorites, loading, error, UpdateFavorites}
}

export default useFavorites