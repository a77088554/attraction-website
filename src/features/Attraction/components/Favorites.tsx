import { useContext } from "react"
import useAttraction from "../hooks/useAttraction"
// import useFavorites from "../hooks/useFavorites"
import { AuthContext } from "../../../core/context/AuthContext"

function Favorites({Favorites, UpdateFavorites}:{Favorites: number[], UpdateFavorites: (favorites: number[]) => Promise<void>}){
    const {IsLogin} = useContext(AuthContext)
    const {Attractions} = useAttraction()
    // const {Favorites, UpdateFavorites} = useFavorites()

    const handleCollection = (i:number)=>{
        const isCollection = Favorites.includes(i)
        if(IsLogin === false) return 
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
        <div className="flex-col-center bg-[#FFE66F] mt-4 p-5 shadow-xl rounded-2xl">
            <h2>已收藏的景點</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {Attractions && Attractions.filter((item)=>Favorites.includes(item.id)).map((item)=>{
                    return (
                        <div key={item.id} className="relative h-30 flex-col-center justify-center bg-gray-300 p-2 rounded-lg shadow-md">
                            {item.name}
                            <a href={item.location} target='_blank'>➔</a>
                            <button 
                                className='absolute w-6 text-red-600 top-2 left-2 hover:scale-125 hover:text-red-800 active:bg-gray-400 rounded-full transition-all  duration-300'
                                onClick={()=>handleCollection(item.id)}>
                                    {Favorites.includes(item.id)? '★': '☆'}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}

export default Favorites