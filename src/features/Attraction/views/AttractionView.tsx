import Favorites from "../components/Favorites";
import Main from "../components/Main";
import Search from "../components/Search";
import useFavorites from "../hooks/useFavorites";

function AttractionView(){
    const favoritesHook = useFavorites()
    
    return(
        <div className="w-full py-8 main-bg-text-color flex-col-center">
            <Main {...favoritesHook}/> 
            <div className="flex-col-center gap-5">
                <Search {...favoritesHook}/>
                <Favorites {...favoritesHook}/>
            </div>
            
        </div>
    )
}

export default AttractionView