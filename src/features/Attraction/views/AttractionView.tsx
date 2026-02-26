import Favorites from "../components/Favorites";
import Main from "../components/Main";
import Search from "../components/Search";
import useFavorites from "../hooks/useFavorites";

function AttractionView(){
    const favoritesHook = useFavorites()
    
    return(
        <div className="w-full py-8 bg-[#FFF4C1] flex-col-center">
            <Main {...favoritesHook}/> 
            <div className="flex justify-center max-sm:flex-col-center gap-5">
                <Search/>
                <Favorites {...favoritesHook}/>
            </div>
            
        </div>
    )
}

export default AttractionView