import { useEffect, useRef, useState } from "react"
import Plan from "../components/Plan"

function PlanView(){
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
        <div className={`flex-col-center transition duration-600 ${!isVisible? 'opacity-0': 'opacity-100'}`} ref={targetRef}>
            <Plan/>
        </div>
    )
}

export default PlanView