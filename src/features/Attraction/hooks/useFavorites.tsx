import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../core/context/AuthContext"
import { supabase } from "../../../core/config/Supabase"

function useFavorites(){
    const {IsLogin, User} = useContext(AuthContext)
    const [Favorites, setFavorites] = useState<number[]>([])

    // 搜索favorites的資訊
    useEffect(()=>{
        const fetchFavorites = async()=>{
            if(IsLogin === false){
                setFavorites([])
                return
            }
            const {data, error} = await supabase
                .from('favorites')
                .select('attraction_id')
                .eq('email', User.email) // 初始會給你'[]'
            if(data){
                const parsedData = JSON.parse(data[0].attraction_id) // 初始為[]
                const result: number[] = parsedData?.sort((a: number, b: number)=> a-b)
                setFavorites(result)
            }
            if(error){
                console.log(error.message)
            }
        }
        try{
            fetchFavorites()
        }
        catch{
            alert('接取你的最愛時發生錯誤，請刷新頁面')
        }
    },[IsLogin])

    // 更新使用者所改變完後的收藏
    const UpdateFavorites = async(input:number[])=>{
        if(IsLogin === false){
            setFavorites([])
            return
        }

        const previous = Favorites   
        setFavorites(input)
            
        try{
            const {error} = await supabase
                .from('favorites')
                .update({attraction_id: JSON.stringify(input)})
                .eq('email', User.email)
            if(error){
                alert('update error')
            }
        }
        catch(error){
            console.log(error)
            setFavorites(previous)
        }
    }

    return {Favorites, UpdateFavorites}
}

export default useFavorites