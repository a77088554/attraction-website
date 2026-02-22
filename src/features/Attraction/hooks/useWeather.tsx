import { useEffect, useState } from "react"
import { TaiwanWeatherModel } from "../types/taiwanWeatherType"

function useWeather(){
    const [WeatherData, setWeatherData] = useState<TaiwanWeatherModel[]>([])

    useEffect(()=>{
        const fethcWeatherData = async()=>{
            const response = await fetch(import.meta.env.VITE_WEATHER_API_URL)
            const data = await response.json()
            setWeatherData(data.records.location)
        }
        try{
            fethcWeatherData()
        }
        catch{
            alert("Error of GET weather data")
        }
    },[])

    return {WeatherData}
}

export default useWeather