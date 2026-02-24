import { useContext, useState } from 'react'
import { TaiwanWeatherModel } from '../types/taiwanWeatherType'
import { AttractionModel } from '../types/attractionType'
import SubmitSuggest from './SubmitSuggest'
import useWeather from '../hooks/useWeather'
import useAttraction from '../hooks/useAttraction'
import { AuthContext } from '../../../core/context/AuthContext'

// 補充Attraction資料在props中
function Main(){
    const {IsLogin} = useContext(AuthContext)
    const {Attractions} = useAttraction()
    const [city, setCity] = useState<string>('嘉義縣')
    const [showSubmit, setShowSubmit] = useState<boolean>(false)
    const {WeatherData} = useWeather()
    const Citys: string[] = WeatherData ? WeatherData.map((item: TaiwanWeatherModel) => item.locationName) : []
    const weather = WeatherData?.find((item: TaiwanWeatherModel) => item.locationName === city)?.weatherElement[0].time[0].parameter.parameterName
    const minTemp = WeatherData?.find((item:TaiwanWeatherModel)=> item.locationName === city)?.weatherElement[2].time[0].parameter.parameterName
    const maxTemp = WeatherData?.find((item: TaiwanWeatherModel) => item.locationName === city)?.weatherElement[4].time[0].parameter.parameterName

    // 處裡使用者按下上傳推薦按鈕
    const handlePost = (i: boolean)=>{
        if(i === false){
            alert('尚未登入')
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
        if(i === true){
            setShowSubmit(true)
        }
    }
    
    return(
        <>
            <div className="flex-col-center">
                功能
                <div className='flex max-sm:flex-col gap-5'>
                    {/* 當地天氣預報 */}
                    <div className='h-fit flex-col-center bg-[#FFE66F] rounded-2xl shadow-lg p-3'>
                        <h1 className=''>當地天氣預報</h1>
                        <div>
                            {WeatherData?.map((item: TaiwanWeatherModel) => {
                                if(item.locationName === city){
                                    return(
                                        <div key={item.locationName}>
                                            <h1>{item.locationName}</h1>
                                            <p>溫度:{weather}</p>
                                            <p>天氣:{`${maxTemp}~${minTemp}℃`}</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <select className='bg-[#FFF4C1] hover:bg-[#FFED97] border rounded-lg p-1' onChange={(e)=> setCity(e.target.value)}>
                            {Citys.map((city:string)=><option key={city} value={city}>{city}</option>)}
                        </select>
                    </div>
                    {/* 推薦觀光景點 */}
                    <div className='flex-col-center bg-[#FFE66F] rounded-2xl shadow-lg p-3'>
                        <h1>{city}推薦光觀地點</h1>
                        <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-4 odd:'>
                            {Attractions && Attractions.map((item: AttractionModel)=>{
                                if(item.city === city){
                                    return(
                                        <div key={item.location} className='h-30 flex-col-center justify-center bg-gray-300 p-2 rounded-lg shadow-md '>
                                            {item.name}
                                            <a href={item.location} target='_blank'>➔</a>
                                        </div>
                                    )
                                }
                            })}
                            <div className='h-30 bg-gray-300 p-2 rounded-lg shadow-md flex-col-center justify-center'>
                                提交其他景點
                                <button onClick={()=>handlePost(IsLogin)}>➔</button>
                                {showSubmit && <SubmitSuggest setShowSubmit={setShowSubmit} city={city}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main