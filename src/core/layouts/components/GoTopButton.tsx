import { useEffect, useState } from "react"

function GoTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(()=>{
        const handleScroll = ()=>{
            if(window.scrollY>30){
                setIsVisible(true)
            }
            else{
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return ()=> window.removeEventListener('scroll', handleScroll)
    },[])

    const handleGoTop =():void=> {
        window.scrollTo({ top: 0, left:0, behavior: 'smooth' })
    }

    return (
        <button 
            onClick={handleGoTop} 
            className={`
                fixed bottom-6 right-6
                bg-gray-800 text-white
                p-3 rounded-full shadow-lg
                transition-all duration-300
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
            `}>
            Top
        </button>
    )
}

export default GoTopButton