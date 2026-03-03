import { useEffect, useState } from "react"
import { AttractionModel } from "../types/attractionType"
import { supabase } from "../../../core/config/Supabase"

function useAttraction(){
    const [Attractions, setAttractions] = useState<AttractionModel[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // 取得supabase中關於attractions的資料
    useEffect(()=>{
        const fetchAttractions = async()=>{
            setLoading(true)
            setError(null)

            const {data, error} = await supabase
                .from('attractions')
                .select()    
            if(error){
                setError(error.message)
            }
            else if(data){
                setAttractions(data)
            }

            setLoading(false)
        }
        
        fetchAttractions()
    },[])
    

    return {Attractions, loading, error}
}

export default useAttraction