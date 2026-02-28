import { useEffect, useState } from "react"

function GoTopButton() {
    const [visible, setVisible] = useState(false)

    useEffect(()=>{
        const handleScroll = ()=>{
            if(window.scrollY>30){
                setVisible(true)
            }
            else{
                setVisible(false)
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
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
            `}>
            Top
        </button>
    )
}

export default GoTopButton