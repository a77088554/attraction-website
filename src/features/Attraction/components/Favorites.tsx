import { useContext } from "react"
import useAttraction from "../hooks/useAttraction"
// import useFavorites from "../hooks/useFavorites"
import { AuthContext } from "../../../core/context/AuthContext"

function Favorites({Favorites, loading, error, UpdateFavorites}:{Favorites: number[], loading:boolean, error:string | null, UpdateFavorites: (favorites: number[]) => Promise<void>}){
    const {IsLogin, setMenuOpen} = useContext(AuthContext)
    const {Attractions} = useAttraction()

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
        <div className="max-lg:w-dvw lg:min-w-[250px] min-h-[280px] section-bg-text-color max-sm:w-dvw p-5 shadow-xl rounded-2xl">
            <h2 className="mb-3">已收藏的景點</h2>
            <div className="lg:grid lg:grid-cols-4 max-lg:flex gap-4 whitespace-nowrap overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory">
                {error?
                    <div className='text-red-600 h-30 flex-col-center justify-center'>Error! 請刷新頁面</div>:
                    loading?
                        <div className="text-gray-50 h-30 flex-col-center justify-center">Loading</div>:
                        Attractions && Attractions.filter((item)=>Favorites.includes(item.id)).map((item)=>{
                        return (
                            <div key={item.id} className=" main-card card-bg-text-color">
                                {item.name}
                                <a href={item.location} target='_blank'>➔</a>
                                <button 
                                    className='absolute w-6 text-red-600 top-2 left-2 hover:scale-125 hover:text-red-800 active:bg-gray-400 rounded-full transition-all  duration-300'
                                    onClick={()=>handleCollection(item.id)}>
                                        {Favorites.includes(item.id)? '★': '☆'}
                                </button>
                            </div>
                        )})
                }
            </div>
        </div>
        
    )
}

export default Favorites