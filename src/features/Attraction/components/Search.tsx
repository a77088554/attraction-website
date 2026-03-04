import { useContext, useState } from "react"
import useDebounce from "../hooks/useDebounce"
import useSearch from "../hooks/useSearch"
import { AuthContext } from "../../../core/context/AuthContext"

function Search({Favorites, UpdateFavorites}:{Favorites: number[], UpdateFavorites: (input: number[]) => Promise<void>}){
    const {IsLogin ,setMenuOpen} = useContext(AuthContext)
    const [input, setInput] = useState<string>("")
    const {DebounceValue} = useDebounce(input)
    const {Search, loading, error} = useSearch(DebounceValue)
    

    const handleCollection = (i:number)=>{
        const isCollection = Favorites.includes(i)
        if(IsLogin === false){
            setMenuOpen(true)
            alert('尚未登入')
            window.scrollTo({ top: 0, left:0, behavior: 'smooth' })
            return 
        } 
        if(isCollection){
            const result = Favorites.filter(item=> item!=i)
            UpdateFavorites(result)
        }
        else{
            const result = [...Favorites, i].sort((a: number, b: number)=> a-b)
            UpdateFavorites(result)
        }
    }

    return(
        <div className="max-sm:w-dvw">
            <div className="section-bg-text-color h-[310px] lg:w-[50dvw] max-lg:w-dvw flex flex-col mt-4 p-5 shadow-xl rounded-2xl">
                <h2>搜尋景點</h2>
                <input 
                    type="text" 
                    placeholder="輸入景點名稱"
                    className="border focus:bg-sky-600 p-1 rounded w-[200px] my-1"
                    onChange={(e)=>setInput(e.target.value)}/>
                {error?
                    <div className="text-red-600 h-30 flex-col-center justify-center">Error! 請重新查詢</div>:
                    !loading?
                    <div className={`flex gap-4 whitespace-nowrap overflow-x-auto overflow-y-hidden pb-1 snap-x snap-mandatory transition-all duration-300 ${Search?.length !== 0? 'opacity-100':'opacity-0'}`}>
                        {Search && Search?.map((item)=>{
                            return(
                                <div key={item.location} className='main-card my-1 card-bg-text-color'>
                                    <div>{item.city}</div>
                                    {item.name}
                                    <a href={item.location} target='_blank'>➔</a>
                                    {/* 添加最愛按鈕 */}
                                    <button 
                                        className='absolute w-6 text-red-600 top-2 left-2 hover:scale-125 hover:text-red-800 active:bg-gray-400 rounded-full transition-all  duration-300'
                                        onClick={()=>handleCollection(item.id)}>
                                            {Favorites.includes(item.id)? '★': '☆'}
                                    </button>
                                </div>
                            )
                            })
                        }
                    </div>:
                    <div className="text-gray-50 h-30 flex-col-center justify-center">Loading</div>
                }
            </div>
        </div>
    )
}

export default Search