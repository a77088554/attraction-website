import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay=500){
    const [DebounceValue, setDebounceValue] = useState(value)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounceValue(value)
        }, delay)
        
        return ()=>clearTimeout(timer)
    },[value, delay])

    return {DebounceValue}
}

export default useDebounce