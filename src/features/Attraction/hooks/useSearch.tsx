import { useEffect, useState } from "react"
import { supabase } from "../../../core/config/Supabase"
import { AttractionModel } from "../types/attractionType"

function useSearch(input: string){
    const [Search, setSearch] = useState<AttractionModel[]>()
    useEffect(()=>{
        const searchAttraction= async()=>{
            if(input === ""){
                setSearch([] as AttractionModel[])
            }
            else{
                const {data, error} = await supabase
                    .from('attractions')
                    .select()
                    .ilike('name', `%${input}%`) 
                if(data){
                    setSearch(data)
                }
                if(error){
                    alert(error.message)
                }
            }
        }
        try{
            searchAttraction()
        }
        catch{
            alert('讀取錯誤，請刷新頁面')
        }
    },[input])

    return {Search}
}

export default useSearch