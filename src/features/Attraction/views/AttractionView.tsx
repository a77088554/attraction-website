import { useEffect, useRef, useState } from "react";
import Favorites from "../components/Favorites";
import Main from "../components/Main";
import Search from "../components/Search";
import useFavorites from "../hooks/useFavorites";

function AttractionView(){
    const favoritesHook = useFavorites()
    const targetRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)    
    
    useEffect(()=>{
        const options = {
            threshold: 0.5,
        }
        const observer = new IntersectionObserver((entries)=>{
            const [entry] = entries
            if(entry.isIntersecting){
                setIsVisible(entry.isIntersecting)
                observer.disconnect()
            }
        },options)

        if(targetRef.current) observer.observe(targetRef.current)
        
        return ()=>{
            observer.disconnect()
        } 
    },[targetRef])

    return(
        <div className={`w-full py-8 overflow-x-hidden main-bg-text-color flex-col-center transition duration-600 ${!isVisible ? 'opacity-0': 'opacity-100'}`} ref={targetRef}>
            <Main {...favoritesHook}/> 
            <div className="flex-col-center gap-5">
                <Search {...favoritesHook}/>
                <Favorites {...favoritesHook}/>
            </div>
            
        </div>
    )
}

export default AttractionView