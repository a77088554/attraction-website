import { useContext, useState } from 'react'
import { TaiwanWeatherModel } from '../types/taiwanWeatherType'
import { AttractionModel } from '../types/attractionType'
import SubmitSuggest from './SubmitSuggest'
import useWeather from '../hooks/useWeather'
import useAttraction from '../hooks/useAttraction'
import { AuthContext } from '../../../core/context/AuthContext'
// import useFavorites from '../hooks/useFavorites'

// 補充Attraction資料在props中
function Main({Favorites, UpdateFavorites}:{Favorites: number[], UpdateFavorites: (input: number[]) => Promise<void>}){
    const {IsLogin, setMenuOpen} = useContext(AuthContext)
    const {Attractions, loading, error} = useAttraction()
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
            setMenuOpen(true)
            alert('尚未登入')
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
        if(i === true){
            setShowSubmit(true)
        }
    }
    
    // 處裡收藏功能
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
        <>
            <div className="w-full flex-col-center lg:">
                <h2 className='text-xl tracking-wide'>查詢旅遊景點以及當地天氣</h2>
                <div className='w-full md:flex md:justify-center max-sm:flex-col-center gap-5'>
                    {/* 當地天氣預報 */}
                    <div className='section-bg-text-color h-fit flex-col-center rounded-2xl shadow-lg p-3 mb-3'>
                        <h1>當地天氣預報</h1>
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
                        <select className='focus:bg-sky-400 focus:text-black border rounded-lg p-1' onChange={(e)=> setCity(e.target.value)}>
                            {Citys.map((city:string)=><option key={city} value={city}>{city}</option>)}
                        </select>
                    </div>
                    {/* 推薦觀光景點 */}
                    <div className='section-bg-text-color h-[240px] lg:w-fit max-sm:w-full flex flex-col rounded-2xl shadow-lg p-3'>
                        <h1 className='pl-3 py-2'>{city}推薦光觀地點</h1>
                        {error?
                            <div className='text-red-600 h-30 flex-col-center justify-center'>Error! 請刷新頁面</div>:
                            !loading?
                                <div className='flex gap-4 whitespace-nowrap overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory'>
                                    {Attractions && Attractions.map((item: AttractionModel)=>{
                                        if(item.city === city){
                                            return(
                                                <div key={item.id} className='main-card card-bg-text-color'>
                                                    {item.name}
                                                    <a href={item.location} target='_blank'>➔</a>
                                                    {/* 添加判斷是否為收藏 */}
                                                    <button 
                                                        className='absolute w-6 text-red-600 top-2 left-2 hover:scale-125 hover:text-red-800 active:bg-gray-400 rounded-full transition-all duration-300'
                                                        onClick={()=>handleCollection(item.id)}>
                                                            {Favorites.includes(item.id)? '★': '☆'}
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })}
                                    <div className='main-card card-bg-text-color'>
                                        提交其他景點
                                        <button onClick={()=>handlePost(IsLogin)}>➔</button>
                                        {showSubmit && <SubmitSuggest setShowSubmit={setShowSubmit} city={city}/>}
                                    </div>
                                </div>:
                                <div className='text-gray-50 h-30 flex-col-center justify-center'>Loading</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main