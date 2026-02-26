import { useState } from "react"
import useDebounce from "../hooks/useDebounce"
import useSearch from "../hooks/useSearch"

function Search(){
    const [input, setInput] = useState<string>("")
    const {DebounceValue} = useDebounce(input)
    const {Search} = useSearch(DebounceValue)

    return(
        <>
            <div className="h-fit flex-col-center justify-center bg-[#FFE66F] mt-4 p-5 shadow-xl rounded-2xl">
                <h2>搜尋景點</h2>
                <input 
                    type="text" 
                    placeholder="輸入景點名稱"
                    className="p-1 bg-amber-50 rounded"
                    onChange={(e)=>setInput(e.target.value)}/>            
                <div className="max-sm:flex-col-center sm:flex sm:justify-center sm:items-center gap-1">
                    {Search?.map((item)=>{
                            return(
                                <div key={item.location} className='mt-3 h-30 flex-col-center justify-center bg-gray-300 p-2 rounded-lg shadow-md '>
                                    <div>{item.city}</div>
                                    {item.name}
                                    <a href={item.location} target='_blank'>➔</a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default Search