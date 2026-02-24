import { useEffect, useState } from "react"
import { PriceModel } from "../types/priceType"
import { supabase } from "../../../core/config/Supabase"

function usePrice(){
    const [Price, setPrice] = useState<PriceModel[]>([])

    useEffect(()=>{
        const fetchPrice = async()=>{
            try{
                const {data, error} = await supabase
                    .from('products')
                    .select()
                if(data){
                    setPrice(data)
                }
                if(error){
                    alert(error.message)
                }
            }
            catch{
                alert("Error of GET price data")
            }
        }
        fetchPrice()
    },[])

    return {Price}
}

export default usePrice