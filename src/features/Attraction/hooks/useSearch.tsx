import { useEffect, useState } from "react"
import { supabase } from "../../../core/config/Supabase"
import { AttractionModel } from "../types/attractionType"

function useSearch(input: string){
    const [Search, setSearch] = useState<AttractionModel[]>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        const searchAttraction= async()=>{
            if(input === ""){
                setSearch([] as AttractionModel[])
            }
            else{
                setLoading(true)
                setError(null)

                const {data, error} = await supabase
                    .from('attractions')
                    .select()
                    .ilike('name', `%${input}%`) 
                if(error){
                    setError(error.message)
                }
                if(data){
                    setSearch(data)
                }
                setLoading(false)
            }
        }

        searchAttraction()
    },[input])

    return {Search, loading, error}
}

export default useSearch