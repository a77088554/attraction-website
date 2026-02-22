import { useEffect, useState } from "react"
import { AttractionModel } from "../types/attractionType"
import { supabase } from "../../../core/config/Supabase"

function useAttraction(){
    const [Attractions, setAttractions] = useState<AttractionModel[]>([])

    // 取得supabase中關於attractions的資料
    useEffect(()=>{
        const fetchAttractions = async()=>{
            const {data, error} = await supabase
                .from('attractions')
                .select()    
            if(data){
                setAttractions(data)
            }
            if(error){
                alert(error.message)
            }
        }
        fetchAttractions()
    },[])
    

    return {Attractions}
}

export default useAttraction